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
import uuid

from django.test import TestCase

from base.tests.factories.person import PersonFactory
from osis_comment.models import CommentEntry
from osis_comment.tests.comment_test.models import DummyModel


class CommentSignalTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.dumb_instance = DummyModel.objects.create(uuid=uuid.uuid4())
        cls.comment_entry = CommentEntry.objects.create(
            object_uuid=cls.dumb_instance.uuid,
            content="un message de test",
            author=PersonFactory(),
        )

    def test_delete_instance_must_delete_related_comment_entries(self):
        all_comment_entries = CommentEntry.objects.all()
        self.assertEqual(all_comment_entries.count(), 1)
        self.dumb_instance.delete()
        self.assertEqual(all_comment_entries.count(), 0)
