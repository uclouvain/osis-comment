/*
 *
 *   OSIS stands for Open Student Information System. It's an application
 *   designed to manage the core business of higher education institutions,
 *   such as universities, faculties, institutes and professional schools.
 *   The core business involves the administration of students, teachers,
 *   courses, programs and so on.
 *
 *   Copyright (C) 2015-2021 Université catholique de Louvain (http://www.uclouvain.be)
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   A copy of this license - GNU General Public License - is available
 *   at the root of the source code of this program.  If not,
 *   see http://www.gnu.org/licenses/.
 *
 */
import Vue from 'vue';
import { i18n } from './i18n';
import CommentThread from './CommentThread.vue';

function initCommentComponents () {
  document.querySelectorAll('.comment-viewer').forEach((elem) => {
    const props = { ...elem.dataset };
    if (typeof props.pageSize !== 'undefined') {
      props.pageSize = Number.parseInt(props.pageSize);
    }
    if (typeof props.tags !== 'undefined') {
      props.tags = props.tags.split(',');
    }
    if (typeof props.richTextConfig !== 'undefined') {
      props.richTextConfig = props.richTextConfig === 'true';
    }
    new Vue({
      render: (h) => h(CommentThread, { props }),
      i18n,
    }).$mount(elem);
  });
}

// Initialize at first load
initCommentComponents();

// Initialize later if nodes are added dynamically
const observer = new MutationObserver(initCommentComponents);
observer.observe(document, { childList: true, subtree: true });
