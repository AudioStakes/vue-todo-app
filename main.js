const STORAGE_KEY = 'todos'
const STORAGE = window.localStorage

new window.Vue({
  data: {
    todos: [],
    newContent: '',
    editContent: '',
    editIndex: null
  },
  mounted () {
    if (STORAGE.getItem(STORAGE_KEY)) {
      try {
        this.todos = JSON.parse(STORAGE.getItem(STORAGE_KEY))
      } catch (e) {
        STORAGE.removeItem(STORAGE_KEY)
      }
    } else {
      this.todos = [
        { content: '1つ目のTODO', isDone: false },
        { content: '2つ目のTODO', isDone: false },
        { content: '3つ目のTODO', isDone: false }
      ]
    }
  },
  methods: {
    add () {
      if (!this.newContent) { return }

      this.todos.push({
        content: this.newContent,
        isDone: false
      })

      this.newContent = ''
    },
    edit (i) {
      this.editIndex = i
      this.editContent = this.todos[i].content
    },
    resetEditing () {
      this.editIndex = null
      this.editContent = ''
    },
    update (i) {
      if (!this.editContent) { return }

      this.todos[i].content = this.editContent

      this.resetEditing()
    },
    remove (i) {
      this.todos.splice(i, 1)
    },
    toggleDoneState (i) {
      this.todos[i].isDone = !this.todos[i].isDone
    }
  },
  watch: {
    todos: {
      handler (todos) {
        const parsed = JSON.stringify(todos)

        STORAGE.setItem(STORAGE_KEY, parsed)
      },
      deep: true
    }
  }
}).$mount('#app')
