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

from django.test import TestCase, override_settings
from django.urls import reverse
from django.utils.datetime_safe import strftime
from rest_framework.test import APIClient

from base.tests.factories.person import PersonFactory
from base.tests.factories.user import UserFactory
from osis_comment.models import CommentEntry
from osis_comment.tests.comment_test.models import DummyModel


@override_settings(ROOT_URLCONF='osis_comment.tests.comment_test.urls')
class CommentApiTestCase(TestCase):
    client_class = APIClient

    @classmethod
    def setUpTestData(cls):
        cls.user = UserFactory()
        cls.dumb_instance = DummyModel.objects.create(uuid=uuid.uuid4())
        cls.dumb_instance_without_comment_entries = DummyModel.objects.create(
            uuid=uuid.uuid4()
        )
        cls.comment_entry_data = {
            "object_uuid": cls.dumb_instance.uuid,
            "content": "un message de test",
            "author": PersonFactory(),
        }
        # Create 3 comment entries related to the same instance
        CommentEntry.objects.create(**cls.comment_entry_data)
        CommentEntry.objects.create(**cls.comment_entry_data, tags=['foo', 'bar'])
        entry = CommentEntry.objects.create(**cls.comment_entry_data)
        cls.created = entry.created_at
        cls.list_url = reverse("comment-test", args=[cls.dumb_instance.uuid])

    def test_list_api_view_returns_related_comment_entries(self):
        self.client.force_login(self.user)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 200)
        # We must get back the 3 comment entries created_at in the setup
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.data[0]["comment"], self.comment_entry_data["content"])
        self.assertEqual(response.data[0]["author"], self.comment_entry_data["author"])
        self.assertEqual(response.data[0]["created_at"], strftime(self.created_at, '%d/%m/%Y %H:%M'))

    def test_list_api_view_returns_no_results_if_given_uuid_is_not_found(self):
        self.client.force_login(self.user)
        list_url = reverse(
            "comment-test",
            args=[self.dumb_instance_without_history_entries.uuid],
        )
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

    def test_list_api_view_returns_filtered_by_tag(self):
        self.client.force_login(self.user)
        response = self.client.get(self.list_url, {'tags': 'foo'})
        self.assertEqual(response.status_code, 200)
        # We must get back one history entry
        self.assertEqual(len(response.data), 1)
