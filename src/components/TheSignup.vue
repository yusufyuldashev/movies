<template>
  <div class="container">
    <section class="signup bg-image">
      <div class="mask d-flex align-items-center h-100">
        <div class="container h-100">
          <div
            class="row d-flex justify-content-center align-items-center h-100"
          >
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div
                class="backRadius card bg-transparent"
                style="border-radius: 15px;"
              >
                <div class="card-body p-5">
                  <base-thedialog
                    :show="!!error"
                    title="An error ocured!!"
                    @close="handleError"
                  >
                    <p>{{ error }}</p>
                  </base-thedialog>
                  <base-thedialog
                    :show="isLoading"
                    title="Authendicating..."
                    fixed
                  >
                    <p>Authendicating ...</p>
                    <base-spinner></base-spinner>
                  </base-thedialog>
                  <h2 class="text-uppercase text-center mb-5 text-white">
                    Create an account
                  </h2>

                  <form @submit.prevent="submitData">
                    <div
                      class="form-outline mb-4"
                      :class="{ invalid: !name.isValid }"
                    >
                      <input
                        type="text"
                        id="form3Example1cg"
                        class="form-control form-control-lg"
                        placeholder="Please enter your name"
                        v-model.trim="name.value"
                        @blur="clearValidity('name')"
                      />
                      <label class="form-label" for="form3Example1cg">
                        Your Name
                      </label>
                    </div>

                    <div
                      class="form-outline mb-4"
                      :class="{ invalid: !email.isValid }"
                    >
                      <input
                        type="email"
                        id="form3Example3cg"
                        class="form-control form-control-lg"
                        placeholder="Please enter your email"
                        v-model.trim="email.value"
                        @blur="clearValidity('email')"
                      />
                      <label class="form-label" for="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    <div
                      class="form-outline mb-4"
                      :class="{ invalid: !password.isValid }"
                    >
                      <input
                        type="password"
                        id="form3Example4cg"
                        class="form-control form-control-lg"
                        placeholder="Please enter your password at least 6"
                        v-model.trim="password.value"
                        @blur="clearValidity('password')"
                      />
                      <label class="form-label" for="form3Example4cg">
                        Password
                      </label>
                    </div>

                    <div
                      class="form-outline mb-4"
                      :class="{ invalid: !repassword.isValid }"
                    >
                      <input
                        type="password"
                        id="form3Example4cdg"
                        class="form-control form-control-lg"
                        placeholder="Please enter password again at least 6"
                        v-model.trim="repassword.value"
                        @blur="clearValidity('repassword')"
                      />
                      <label class="form-label" for="form3Example4cdg">
                        Repeat your password
                      </label>
                    </div>

                    <div
                      class="form-check d-flex justify-content-center mb-5"
                      :class="{ invalid: !confirm.isValid }"
                    >
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                        v-model.trim="confirm.value"
                        @blur="clearValidity('confirm')"
                      />
                      <label class="form-check-label" for="form2Example3cg">
                        I agree all statements in
                        <a href="#">Terms of service</a>
                      </label>
                    </div>

                    <div class="d-flex justify-content-center">
                      <button
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">
                      Have already an account?
                      <a href="#" class="fw-bold text-body">
                        <router-link to="/login">Login here</router-link>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: {
        value: '',
        isValid: true,
      },
      email: {
        value: '',
        isValid: true,
      },
      password: {
        value: '',
        isValid: true,
      },
      repassword: {
        value: '',
        isValid: true,
      },
      confirm: {
        value: false,
        isValid: true,
      },
      formIsValid: true,
      isLoading: false,
      error: null,
    }
  },
  methods: {
    handleError() {
      this.error = null
    },
    validataInput() {
      this.formIsValid = true
      if (this.name.value === '') {
        this.name.isValid = false
        this.formIsValid = false
      }
      if (this.email.value === '') {
        this.email.isValid = false
        this.formIsValid = false
      }
      if (this.password.value === '' || this.repassword.value === '') {
        this.password.isValid = false
        this.repassword.isValid = false
        this.formIsValid = true
      }
      if (this.password.value.length < 6 || this.repassword.value.length < 6) {
        this.password.isValid = false
        this.repassword.isValid = false
        this.formIsValid = true
      }
      if (this.password.value !== this.repassword.value) {
        this.password.isValid = false
        this.repassword.isValid = false
        this.formIsValid = false
      }
      if (this.confirm.value === false) {
        this.confirm.isValid = false
        this.formIsValid = false
      }
    },
    clearValidity(input) {
      this[input].isValid = true
    },
    async submitData() {
      this.validataInput()
      if (!this.formIsValid) {
        return
      }
      this.isLoading = true
      try {
        await this.$store.dispatch('signup', {
          email: this.email.value,
          password: this.password.value,
          returnSecureToken: true,
        })
        this.$router.replace('/movies')
      } catch (err) {
        this.error =
          err.message ||
          'failed to authendicate , try  later check  your login data'
      }
      this.isLoading = false
    },
  },
}
</script>

<style scoped lang="scss">
.invalid input,
.invalid label,
.invalid input::placeholder {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.backRadius {
  border: 1px solid rgb(58, 54, 54);
}
.form-label {
  color: white;
}
.form-check-label {
  color: white;
}
.signup {
  margin-top: 40px;
}
.container {
  width: 1050px;
  margin: 0 auto;
}
.gradient-custom-3 {
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(132, 250, 176, 0.5),
    rgba(143, 211, 244, 0.5)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(
    to right,
    rgba(132, 250, 176, 0.5),
    rgba(143, 211, 244, 0.5)
  );
}
.gradient-custom-4 {
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(132, 250, 176, 1),
    rgba(143, 211, 244, 1)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(
    to right,
    rgba(132, 250, 176, 1),
    rgba(143, 211, 244, 1)
  );
}
</style>
