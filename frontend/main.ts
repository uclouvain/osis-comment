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
import {createApp} from '@vue/runtime-dom'; // not importing from 'vue' so it can be spied on
import {i18n} from './i18n';
import CommentThread from './CommentThread.vue';
import CommentCount from "./components/CommentCount.vue";

interface Props extends Record<string, unknown> {
  url: string,
  headerTitle?: string,
  defaultSort?: string,
  panelClass?: string,
  richTextConfig?: object,
  pageSize?: number,
  tags?: string[],
}

function initCommentComponents() {

  document.querySelectorAll<HTMLElement>('.comment-viewer:not([data-v-app])').forEach((elem) => {
    const props: Props = {url: "", ...elem.dataset};
    if (typeof elem.dataset.pageSize !== 'undefined') {
      props.pageSize = Number.parseInt(elem.dataset.pageSize);
    }
    if (typeof elem.dataset.tags !== 'undefined') {
      props.tags = elem.dataset.tags.split(',');
    }
    if (typeof elem.dataset.richTextConfig !== 'undefined') {
      props.richTextConfig = JSON.parse(elem.dataset.richTextConfig) as object;
    }
    createApp(CommentThread, props).use(i18n).mount(elem);
  });

  document.querySelectorAll<HTMLElement>('.comment-count:not([data-v-app])').forEach((elem) => {
      const props: Props = {url: "", ...elem.dataset};
      createApp(CommentCount, props).mount(elem);
  });
}

// Initialize at first load
initCommentComponents();

// Initialize later if nodes are added dynamically
const observer = new MutationObserver(initCommentComponents);
observer.observe(document, {childList: true, subtree: true});
