<template>
  <div>
    <Collapse v-model="collapseIndex" accordion>
      <Panel v-for="act in activity" :key="act.id" :name="`` + act.id">
        <Tag color="success"> {{ act.date }}</Tag>
        {{ act.name }}
        <div style="float: right">
          <Tag
            v-for="lab in act.label.split(',')"
            :key="lab"
            :color="randomLabelColor(lab)"
          >
            {{ lab }}
          </Tag>
        </div>
        <template slot="content">
          <p>{{ act.comment }}</p>
        </template>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
import { activity } from 'assets/reader'
import { randomLabelColor } from '../assets/util'
export default {
  name: 'Activity',
  data() {
    return {
      randomLabelColor,
      collapseIndex: '0',
      activity,
    }
  },
}
</script>
