const STORAGE_KEY = 'todos'
const STORAGE = window.localStorage

new window.Vue({
  data: {
    todos: [],
    newId: null,
    newContent: '',
    editId: null,
    editContent: ''
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
        { id: 1, content: '1つ目のTODO', isDone: false },
        { id: 2, content: '2つ目のTODO', isDone: false },
        { id: 3, content: '3つ目のTODO', isDone: false }
      ]
    }
    this.newId = this.todos.length ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1
  },
  methods: {
    add () {
      if (!this.newContent) { return }

      this.todos.push({
        id: this.newId,
        content: this.newContent,
        isDone: false
      })

      this.newId++
      this.newContent = ''
    },
    edit (todo) {
      this.editId = todo.id
      this.editContent = todo.content
    },
    resetEditing () {
      this.editId = null
      this.editContent = ''
    },
    update (todo) {
      if (!this.editContent) { return }

      todo.content = this.editContent

      this.resetEditing()
    },
    remove (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    toggleDoneState (todo) {
      todo.isDone = !todo.isDone
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
