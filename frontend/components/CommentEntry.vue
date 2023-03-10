<!--
  -
  - OSIS stands for Open Student Information System. It's an application
  - designed to manage the core business of higher education institutions,
  - such as universities, faculties, institutes and professional schools.
  - The core business involves the administration of students, teachers,
  - courses, programs and so on.
  -
  - Copyright (C) 2015-2023 Université catholique de Louvain (http://www.uclouvain.be)
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - A copy of this license - GNU General Public License - is available
  - at the root of the source code of this program.  If not,
  - see http://www.gnu.org/licenses/.
  -
  -->

<template>
  <div class="panel-body clearfix">
    <div class="comment-authoring">
      <strong>{{ entry.author || $t('entry.anonymous') }}</strong>
      {{
        $t('entry.authored_date', {
          date: entry.created_at.toLocaleDateString(),
          time: entry.created_at.toLocaleTimeString(),
        })
      }}
    </div>
    <template v-if="!isEditing">
      <div class="pull-right comment-actions">
        <button
            v-if="typeof entry.links.edit === 'string'"
            class="btn btn-sm btn-default"
            :title="$t('entry.edit_comment')"
            @click="isEditing = true"
        >
          <i class="fas fa-pencil" />
        </button>
        <button
            v-if="typeof entry.links.delete === 'string'"
            class="btn btn-sm btn-danger"
            :title="$t('entry.delete_comment')"
            @click="$emit('delete', entry.links.delete)"
        >
          <i class="fas fa-trash-alt" />
        </button>
      </div>
      <div
          v-if="!richTextConfig"
          class="comment-content"
      >
        <!-- eslint-disable vue/no-v-html -->
        <p v-html="entry.comment.replace(/\n/g, '<br/>')" />
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <div
          v-else
          class="comment-content"
          v-html="entry.comment"
      />
    </template>
    <CommentEditor
        v-else
        :default-value="entry.comment"
        :rich-text-config="richTextConfig"
        @submit="(value) => $emit('edit', entry.links.edit, value)"
        @cancel="isEditing = false"
    />
  </div>
</template>

<script lang="ts">
import {Entry} from '../types';
import CommentEditor from './CommentEditor.vue';
import {defineComponent} from "vue";

export default defineComponent({
  name: 'CommentEntry',
  components: {CommentEditor},
  props: {
    richTextConfig: {
      type: Object,
      default: () => undefined,
    },
    entry: {
      type: Entry,
      required: true,
    },
  },
  emits: ['edit', 'delete'],
  data: function () {
    return {
      isEditing: false,
    };
  },
});
</script>

<style>
.comment-authoring {
  background: #dddddd;
  padding: .5em 1em;
}

.comment-content {
  padding: 1em 0;
}

.comment-actions {
  padding: 4px 0;
}
</style>
