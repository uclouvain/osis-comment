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

from django.views.generic import TemplateView

from osis_comment.contrib.mixins import CommentEntryAPIMixin
from osis_comment.tests.comment_test.models import DummyModel


class CommentTestAPIView(CommentEntryAPIMixin):
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


class CommentTestListView(TemplateView):
    template_name = 'comment_test/comment_test.html'

    def get_context_data(self, **kwargs):
        kwargs['object'] = DummyModel.objects.first()
        return super().get_context_data(**kwargs)
