# ##############################################################################
#
#  OSIS stands for Open Student Information System. It's an application
#  designed to manage the core business of higher education institutions,
#  such as universities, faculties, institutes and professional schools.
#  The core business involves the administration of students, teachers,
#  courses, programs and so on.
#
#  Copyright (C) 2015-2023 Université catholique de Louvain (http://www.uclouvain.be)
#
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  A copy of this license - GNU General Public License - is available
#  at the root of the source code of this program.  If not,
#  see http://www.gnu.org/licenses/.
#
# ##############################################################################
from django.http import Http404
from django.utils.decorators import classonlymethod
from rest_framework.authentication import SessionAuthentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from .serializers import CommentEntrySerializer
from ..models import CommentEntry

__all__ = [
    "CommentEntryAPIMixin",
]


class LimitOffsetWithCreateLinkPagination(LimitOffsetPagination):
    def paginate_queryset(self, queryset, request, view=None):
        self.view = view
        return super().paginate_queryset(queryset, request, view)

    def get_paginated_response(self, data):
        create_url = {'error': _("Permission error")}
        if self.view.has_add_permission():
            request = self.request.resolver_match
            path_name = f"{request.namespace}:{request.url_name}" if request.namespace else request.url_name
            create_url = reverse(path_name, kwargs=request.kwargs)
        return Response(
            OrderedDict(
                [
                    ('count', self.count),
                    ('next', self.get_next_link()),
                    ('previous', self.get_previous_link()),
                    ('create', create_url),
                    ('results', data),
                ]
            )
        )


class CommentEntryAPIMixin(ModelViewSet):
    authentication_classes = [SessionAuthentication]
    serializer_class = CommentEntrySerializer
    pagination_class = LimitOffsetWithCreateLinkPagination
    lookup_url_kwarg = 'comment_uuid'

    @classonlymethod
    def as_view(cls, actions=None, **initkwargs):
        # Set default action to be list for GET
        return super().as_view(
            actions={'get': 'list', 'post': 'create', 'put': 'update', 'delete': 'destroy'},
            **initkwargs,
        )

    def has_add_permission(self):
        """
        Override to define if the current user is allowed to create a comment
        :return:
        """
        return True

    def has_change_permission(self, comment):
        """
        Override to define if a user is allowed to edit a comment entry
        :return:
        """
        return True

    def has_delete_permission(self, comment):
        """
        Override to define if a user is allowed to edit a comment entry
        :return:
        """
        return True

    def filter_queryset(self, queryset):
        qs = super().filter_queryset(queryset)

        # Single comment
        if 'last' in self.request.GET:
            return qs.order_by('-created_at')[:1]

        # Sorting
        current_sort = self.request.GET.get('sort', '-created')
        valid_sort = current_sort.lstrip('-') == 'created'
        if valid_sort:
            return qs.order_by('-created_at' if current_sort[0] == '-' else 'created_at')

        return qs

    def get_queryset(self):
        """Filter the queryset with the object's uuid passed in url"""
        object_uuid = self.kwargs.get("uuid")
        if not object_uuid:
            raise Http404
        qs = CommentEntry.objects.filter(object_uuid=object_uuid)
        tags = self.request.query_params.get('tags', '')
        if tags:
            qs = qs.filter(tags__contains=tags.split(','))
        return qs
