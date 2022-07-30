import axios from "axios"

axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.token}`