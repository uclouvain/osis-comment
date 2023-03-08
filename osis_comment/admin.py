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
from django.contrib import admin
from osis_comment.models import CommentEntry
from django.utils.translation import gettext_lazy as _


class ArrayFieldListFilter(admin.SimpleListFilter):
    """An admin list filter for ArrayFields."""

    def lookups(self, request, model_admin):
        """Return the filtered queryset."""
        queryset_values = model_admin.model.objects.values_list(
            self.parameter_name, flat=True
        )
        values = []
        for sublist in queryset_values:
            if sublist:
                for value in sublist:
                    if value:
                        values.append((value, value))
            else:
                values.append(("null", "-"))
        return sorted(set(values))

    def queryset(self, request, queryset):
        """Return the filtered queryset."""
        lookup_value = self.value()
        if lookup_value:
            lookup_filter = (
                {"{}__isnull".format(self.parameter_name): True}
                if lookup_value == "null"
                else {"{}__contains".format(self.parameter_name):
                          [lookup_value]}
            )
            queryset = queryset.filter(**lookup_filter)
        return queryset


class TagsListFilter(ArrayFieldListFilter):
    title = _("Tags")
    parameter_name = "tags"


class CommentEntryAdmin(admin.ModelAdmin):
    list_display = (
        'object_uuid',
        'created_at',
        'author',
    )
    raw_id_fields = ['author']
    list_filter = [TagsListFilter]
    list_select_related = ['author']
    search_fields = ('object_uuid', 'author')
    date_hierarchy = 'created_at'


admin.site.register(CommentEntry, CommentEntryAdmin)
