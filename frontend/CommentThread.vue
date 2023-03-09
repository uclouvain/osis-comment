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
  <div class="comment-thread panel panel-primary">
    <div class="panel-heading clearfix">
      {{ headerTitle || $t('thread.title') }}
      <button
          class="btn btn-default btn-sm pull-right"
          @click="changeSort()"
      >
        {{ $t('thread.sort') }}
        <span
            class="fas"
            :class="isAscendedSort ? 'fa-sort-up' : 'fa-sort-down'"
        />
      </button>
    </div>
    <span
        v-if="loading"
        class="spinner"
    />
    <span
        v-else-if="error"
        class="text-danger"
    >
      {{ error }}
    </span>
    <CommentEntry
        v-for="entry in entries"
        v-else
        :key="entry.uuid"
        :entry="entry"
        @edit="editEntry"
        @delete="deleteEntry"
    />
    <div class="panel-body">
      <button
          v-if="previousPage"
          class="btn btn-sm btn-default"
          @click="currentUrl = previousPage; loadEntries()"
      >
        <i class="fas fa-chevron-left" />
        {{ $t('thread.previous') }}
      </button>
      <button
          v-if="nextPage"
          class="btn btn-sm btn-default"
          @click="currentUrl = nextPage; loadEntries()"
      >
        {{ $t('thread.next') }}
        <i class="fas fa-chevron-right" />
      </button>
      <template v-if="createUrl">
        <button
            v-if="!isAdding"
            class="btn btn-sm btn-default pull-right"
            @click="isAdding = !isAdding"
        >
          <i class="fas fa-plus text-success" />
          {{ $t('thread.add_comment') }}
        </button>
        <CommentEditor
            v-else
            @submit="createEntry"
            @cancel="isAdding = !isAdding"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import CommentEntry from './components/CommentEntry.vue';
import Entry from './entry';
import CommentEditor from './CommentEditor.vue';

export default {
  name: 'CommentThread',
  components: { CommentEditor, CommentEntry },
  props: {
    url: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    headerTitle: {
      type: String,
      default: '',
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    defaultSort: {
      type: String,
      default: '-created',
    },
  },
  data () {
    const params = new URLSearchParams({
      limit: this.pageSize,
      sort: '-created',
    });
    if (this.tags) {
      params.append('tags', this.tags.join(','));
    }
    const element: HTMLInputElement = document.querySelector('[name=csrfmiddlewaretoken]');
    return {
      entries: [],
      error: '',
      createUrl: '',
      currentUrl: `${this.url}?${params.toString()}`,
      currentSort: '-created',
      previousPage: null,
      nextPage: null,
      loading: true,
      isAdding: false,
      csrfToken: element.value,
    };
  },
  computed: {
    isAscendedSort: function () {
      return this.currentSort === 'created';
    },
  },
  async mounted () {
    await this.loadEntries();
  },
  methods: {
    async changeSort () {
      const url = new URL(window.location.origin + this.currentUrl);
      const params = new URLSearchParams(url.search);
      this.currentSort = this.isAscendedSort ? '-created' : 'created';
      params.set('sort', this.currentSort);
      this.currentUrl = `${url.pathname}?${params.toString()}`;
      await this.loadEntries();
    },
    async loadEntries () {
      try {
        const response = await fetch(this.currentUrl);
        if (response.status === 200) {
          const data = await response.json();
          this.createUrl = data.create;
          this.previousPage = data.previous;
          this.nextPage = data.next;
          this.entries = data.results.map(e => new Entry(e));
        } else {
          this.error = response.statusText;
        }
      } catch (e) {
        this.error = e;
      }
      this.loading = false;
    },
    async createEntry (value) {
      await this.doRequest(this.createUrl, {
        method: 'POST',
        body: JSON.stringify({ comment: value, tags: this.tags }),
      });
      this.isAdding = false;
    },
    async editEntry (url, value) {
      await this.doRequest(url, {
        method: 'PUT',
        body: JSON.stringify({ comment: value }),
      });
    },
    async deleteEntry (url) {
      await this.doRequest(url, { method: 'DELETE' });
    },
    async doRequest (url, request) {
      this.loading = true;
      try {
        const response = await fetch(url, {
          mode: 'same-origin',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRFToken': this.csrfToken,
          },
          ...request,
        });
        if (response.status >= 200 && response.status < 300) {
          await this.loadEntries();
        } else {
          this.error = response.statusText;
        }
      } catch (e) {
        this.error = e;
      }
      this.loading = false;
    },
  },
};
</script>

<style>
.comment-thread .panel-heading {
  line-height: 30px;
}

.comment-thread .panel-body {
  border-bottom: 1px solid #ddd;
}

.comment-thread .panel-body:last-child {
  border-bottom: none;
}
</style>
