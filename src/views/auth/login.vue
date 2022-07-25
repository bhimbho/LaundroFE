<template>
  <div>
    <div>
      <div class="container-fluid p-0">
        <div class="row d-flex justify-content-center no-gutters">
          <div class="col-lg-5">
            <div
              class="authentication-page-content p-4 d-flex align-items-center min-vh-100"
            >
              <div class="w-100">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <div>
                      <div class="text-center">
                        <div>
                          <a href="/" class="logo">
                            <img
                              src="@/assets/images/logo-dark.png"
                              height="40"
                              alt="logo"
                            />
                          </a>
                        </div>

                        <h4 class="font-size-18 mt-4">
                          Welcome Back to Eligail Laundro Manager.
                        </h4>
                        <!-- <p class='text-muted'>Sign in to continue to Eligail Laundro Manager.</p> -->
                      </div>

                      <div class="p-2 mt-5">
                        <form
                          class="form-horizontal"
                          @submit.prevent="login()"
                        >
                          <div class="form-group auth-form-group-custom mb-4">
                            <i class="ri-mail-line auti-custom-input-icon"></i>
                            <label for="email">Email</label>
                            <input
                              type="email"
                              v-model="user.email"
                              class="form-control"
                              id="email"
                              placeholder="Enter email"
                            />
                          </div>

                          <div class="form-group auth-form-group-custom mb-4">
                            <i
                              class="ri-lock-2-line auti-custom-input-icon"
                            ></i>
                            <label for="userpassword">Password</label>
                            <input
                              v-model="user.password"
                              type="password"
                              class="form-control"
                              id="userpassword"
                              placeholder="Enter password"
                            />
                          </div>

                          <div class="mt-4 text-center">
                            <button
                              class="btn btn-primary w-md waves-effect waves-light btn-block"
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                        </form>
                      </div>

                      <div class="mt-3 text-center">
                        <p>
                          © 2022 Laundro. Crafted with
                          <i class="mdi mdi-heart text-danger"></i> for Eligail
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      submitted: false,
    };
  },
  computed: {},
  created() {
    document.body.classList.add("auth-body-bg");
  },
  methods: {
    // Try to log the user in with the username
    // and password they provided.
    login: function () {
      // this.isLoading = true;
      this.$store
        .dispatch("login", {
          email: this.user.email,
          password: this.user.password,
        })
        .then(() => {
          // this.isLoading = false;
          // console.log(response);
          this.$router.push({ name: "dashboard" });
        })
        .catch((err) => {
          if (err.response.status == 400) {
            this.error = "Invalid login details";
            // this.isLoading = false;
          }
          if (err.response.status == 422) {
            this.error = "Fields are empty";
            // this.isLoading = false;
          }
        });
    },
  },
};
</script>
