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

import uuid as uuid
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.utils.translation import gettext_lazy as _


class CommentEntry(models.Model):
    uuid = models.UUIDField(
        verbose_name=_("UUID"),
        primary_key=True,
        default=uuid.uuid4,
    )
    object_uuid = models.UUIDField(
        verbose_name=_("Registered object's UUID"),
        db_index=True,
    )
    content = models.TextField()
    created_at = models.DateTimeField(
        verbose_name=_("Created"),
        auto_now_add=True,
    )
    author = models.ForeignKey(
        'base.Person',
        on_delete=models.SET_NULL,
        null=True,
    )
    tags = ArrayField(
        models.CharField(max_length=50),
        verbose_name=_("Tags"),
        blank=True,
        default=list,
    )
    extra_data = models.JSONField(
        verbose_name=_("Extra data"),
        blank=True,
        default=dict,
    )

    class Meta:
        verbose_name = _("Comment entry")
        verbose_name_plural = _("Comment entries")
        ordering = ("-created_at",)
