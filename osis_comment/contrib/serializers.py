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
from django.urls import reverse
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _

from osis_comment.models import CommentEntry

__all__ = [
    "CommentEntrySerializer",
]


class CommentEntrySerializer(serializers.ModelSerializer):
    comment = serializers.CharField(source='content')
    created_at = serializers.DateTimeField(read_only=True)
    modified_at = serializers.DateTimeField(read_only=True)
    links = serializers.SerializerMethodField()
    author = serializers.StringRelatedField()

    class Meta:
        model = CommentEntry
        read_only_fields = [
            "author",
        ]
        fields = [
            "uuid",
            "comment",
            "created_at",
            "modified_at",
            "author",
            "tags",
            "extra_data",
            "links",
        ]

    def create(self, validated_data):
        # Inject the uuid of the object being commented on
        validated_data['object_uuid'] = self.context['view'].kwargs['uuid']
        validated_data['author'] = getattr(self.context['request'].user, 'person', None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['author'] = getattr(self.context['request'].user, 'person', None)
        return super().update(instance, validated_data)

    def get_links(self, comment):
        view = self.context['view']
        request = self.context['request'].resolver_match

        kwargs = {**view.kwargs, view.lookup_url_kwarg: comment.uuid}
        path_name = f"{request.namespace}:{request.url_name}" if request.namespace else request.url_name
        detail_url = reverse(path_name, kwargs=kwargs)
        access_error = {'error': _("Permission error")}
        return {
            'edit': detail_url if view.has_change_permission(comment) else access_error,
            'delete': detail_url if view.has_delete_permission(comment) else access_error,
        }
