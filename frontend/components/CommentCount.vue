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
  <div class="badge badge-compteur">
    {{ value }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {type EntriesResponse} from "../interfaces";
import EventBus from "../event-bus";

export default defineComponent({
  name: 'CommentCount',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      value: null as number | null,
      loading: true,
      error: '',
    };
  },
  mounted() {
    void this.loadCount();
    EventBus.on("REFRESH_COMMENTS_EVENT",() => void this.loadCount());
  },
  methods: {
    async loadCount() {
      const data = (await this.doRequest(this.url, {})) as EntriesResponse;
      if (data) {
        this.value = data.count;
      }
    },
    async doRequest(url: string, params: object) {
      this.loading = true;
      this.error = '';
      try {
        const response = await fetch(url, {
          mode: 'same-origin',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          ...params,
        });
        if (response.status >= 200 && response.status < 300) {
          this.loading = false;
          return response.json();
        }
      } catch (e) {
        this.error = (e as Error).message;
      }
      this.loading = false;
    },
  },
});
</script>


<style>
  .badge {
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #777;
    border-radius: 10px;
  }

  .badge-compteur{
    margin-left: 5px;
    font-size: 9px;
    background-color: #337ab7;
  }
</style>
