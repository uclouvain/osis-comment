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
  <div>
    <textarea
        v-if="!richTextConfig"
        v-model="value"
        class="form-control"
        :placeholder="$t('entry.placeholder')"
    />
    <ckeditor
        v-else
        v-model="value"
        :config="richTextConfig"
    />
    <div class="text-right">
      <button
          class="btn btn-sm btn-success"
          @click="$emit('submit', value)"
      >
        {{ $t('entry.submit_comment') }}
      </button>
      <button
          class="btn btn-sm btn-default"
          @click="$emit('cancel')"
      >
        {{ $t('entry.cancel_edit') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import component from './ckeditor.js';
import {defineComponent} from 'vue';
import type {Component} from 'vue';

export default defineComponent({
  name: 'CommentEditor',
  components: {
    ckeditor: (component as Component),
  },
  props: {
    richTextConfig: {
      type: Object,
      default: () => undefined,
    },
    defaultValue: {
      type: String,
      default: '',
    },
  },
  emits: ['cancel', 'submit'],
  data: function () {
    return {
      value: this.defaultValue,
    };
  },
});
</script>
