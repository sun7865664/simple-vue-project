<template>
  <div>
    <div id="example">
      <my-component></my-component>
    </div>
    <div id="example-2">
      <simple-counter></simple-counter>
      <simple-counter></simple-counter>
      <simple-counter></simple-counter>
    </div>
    <child my-message="hello!"></child>
    <div>
      <input v-model="parentMsg">
      <br>
      <child :my-message="parentMsg"></child>
    </div>
    <div id="counter-event-example">
      <p>{{ total }}</p>
      <button-counter v-on:increment="incrementTotal"></button-counter>
      <button-counter v-on:increment="incrementTotal"></button-counter>
      <button-counter v-on:increment="incrementTotal"></button-counter>
    </div>
    <currency-input v-model="price"></currency-input>
    <my-checkbox v-model="foo" value="some value"></my-checkbox>
    <vue-select>
      <vue-option v-for="item in [{n:1,v:1},{n:2,v:2},{n:3,v:3}]" :item="item"></vue-option>
    </vue-select>
    <div>
      <h1>我是父组件的标题</h1>
      <pppcomponent>
        <p>这是一些初始内容</p>
        <p>这是更多的初始内容</p>
      </pppcomponent>
    </div>
    <app-layout>
      <h1 slot="header">这里可能是一个页面标题</h1>
      <p>主要内容的一个段落。</p>
      <p>另一个主要段落。</p>
      <p slot="footer">这里有一些联系信息</p>
    </app-layout>
    <div class="parent">
      <sl-c1>
        <template scope="props">
          <span>hello from parent</span>
          <span>{{ props.text }}</span>
        </template>
      </sl-c1>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  Vue.component('sl-c1', {
    template: '<div class="child"><slot text="hello from child"></slot></div>'
  })

  Vue.component('app-layout', {
    template: '<div class="container"><header><slot name="header"></slot></header><main><slot></slot></main><footer><slot name="footer"></slot></footer></div>'
  })

  // 注册
  Vue.component('my-component', {
    template: '<div>A custom component!(全局注册)</div>'
  })

  // var data = { counter: 0 }
  Vue.component('simple-counter', {
    template: '<button v-on:click="counter += 1">{{ counter }}</button>',
    // 技术上 data 的确是一个函数了，因此 Vue 不会警告，
    // 但是我们却给每个组件实例返回了同一个对象的引用
    data: function () {
      // return data
      return {
        counter: 0
      }
    }
  })

  Vue.component('child', {
    // 声明 props
    props: {
      'myMessage': String
    },
    // 就像 data 一样，prop 也可以在模板中使用
    // 同样也可以在 vm 实例中通过 this.message 来使用
    template: '<span>{{ myMessage }}</span>'
  })

  Vue.component('button-counter', {
    template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
    data: function () {
      return {
        counter: 0
      }
    },
    methods: {
      incrementCounter: function () {
        this.counter += 1
        this.$emit('increment')
      }
    }
  })

  Vue.component('currency-input', {
    template: '<span><input ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)"></span>',
    props: ['value'],
    methods: {
      // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
      updateValue: function (value) {
        var formattedValue = value
          // 删除两侧的空格符
          .trim()
          // 保留 2 位小数
          .slice(
            0,
            value.indexOf('.') === -1
              ? value.length
              : value.indexOf('.') + 3
          )
        // 如果值尚不合规，则手动覆盖为合规的值
        if (formattedValue !== value) {
          this.$refs.input.value = formattedValue
        }
        // 通过 input 事件带出数值
        this.$emit('input', Number(formattedValue))
      }
    }
  })

  Vue.component('my-checkbox', {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean,
      // 这样就允许拿 `value` 这个 prop 做其它事了
      value: String
    },
    template: '<div><label for="my-checkbox">{{value}}:</label><input id="my-checkbox" type="checkbox" :checked="checked"></div>'
  })

  Vue.component('vue-select', {
    template: '<select><slot>没有则显示这个</slot></select>'
  })

  Vue.component('vue-option', {
    props: ['item'],
    template: '<option value="item.v">{{item.n}}</option>'
  })

  Vue.component('pppcomponent', {
    template: '<div><h2>我是子组件的标题</h2><slot>只有在没有要分发的内容时才会显示。</slot></div>'
  })

  var Child = {
    template: '<div>A custom component!(child)</div>'
  }

  export default {
    name: 'component',
    components: {
      // <my-component> 将只在父组件模板中可用
      'my-component': Child
    },
    data () {
      return {
        total: 0,
        parentMsg: '每当父组件的数据变化时，该变化也会传导给子组件',
        price: 0.1,
        foo: true
      }
    },
    methods: {
      incrementTotal: function () {
        this.total += 1
      }
    }
  }
</script>
