<template>
  <div class="container1">
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <base-thedialog
              :show="!!error"
              title="An error ocured!!"
              @close="handleError"
            >
              <p>{{ error }}</p>
            </base-thedialog>
            <base-thedialog :show="isLoading" title="Authendicating..." fixed>
              <p>Authendicating ...</p>
              <base-spinner></base-spinner>
            </base-thedialog>
            <form @submit.prevent="submitData">
              <!-- Email input -->
              <div
                class="form-outline mb-4"
                :class="{ invalid: !email.isValid }"
              >
                <input
                  type="email"
                  id="form1Example13"
                  class="form-control form-control-lg"
                  placeholder="Please enter a valid email  address"
                  v-model.trim="email.val"
                  @blur="clearValidity('email')"
                />
                <label class="form-label" for="form1Example13">
                  Email address
                </label>
              </div>

              <!-- Password input -->
              <div
                class="form-outline mb-4"
                :class="{ invalid: !password.isValid }"
              >
                <input
                  type="password"
                  id="form1Example23"
                  class="form-control form-control-lg"
                  placeholder="Please enter a valid password"
                  v-model.trim="password.val"
                  @blur="clearValidity('password')"
                />
                <label class="form-label" for="form1Example23">Password</label>
              </div>

              <div
                class="d-flex justify-content-around align-items-center mb-4"
              >
                <!-- Checkbox -->
                <div class="form-check" :class="{ invalid: !confirm.isValid }">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="form1Example3"
                    checked
                    v-model.trim="confirm.val"
                    @blur="clearValidity('confirm')"
                  />
                  <label class="form-check-label" for="form1Example3">
                    Remember me
                  </label>
                </div>
                <router-link to="/signup" class="forgot">
                  Create new account ?
                </router-link>
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-lg btn-block">
                Sign in
              </button>

              <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
            </form>
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
      email: {
        val: '',
        isValid: true,
      },
      password: {
        val: '',
        isValid: true,
      },
      confirm: {
        val: false,
        isValid: true,
      },
      formIsValid: true,
      error: null,
      isLoading: false,
    }
  },
  methods: {
    handleError() {
      this.error = null
    },
    clearValidity(input) {
      this[input].isValid = true
    },
    validateInput() {
      this.formIsValid = true
      if (this.email.val === '' && this.password.val === '') {
        this.formIsValid = false
        this.email.isValid = false
        this.password.isValid = false
      }
      if (this.email.val.length < 6 && this.password.val.length < 6) {
        this.formIsValid = false
        this.email.isValid = false
        this.password.isValid = false
      }
      if (this.confirm.val === false) {
        this.formIsValid = false
        this.confirm.isValid = false
      }
    },
    async submitData() {
      this.validateInput()
      if (!this.formIsValid) {
        return
      }
      this.isLoading = true
      try {
        await this.$store.dispatch('login', {
          email: this.email.val,
          password: this.password.val,
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
  color: red !important;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.forgot {
  text-decoration: none;
  color: rgba(11, 227, 255, 0.568);
}
.form-check label {
  color: grey;
}
.form-outline label {
  color: grey;
}
.form-outline input {
  background: rgb(161, 159, 159);
}

.container1 {
  width: 1050px;
  margin: 0 auto;
}
.divider:after,
.divider:before {
  content: '';
  flex: 1;
  height: 1px;
  background: #eee;
}
@media only screen and (max-width: 1200px) {
  .container1 {
    width: 95% !important;
  }
}
</style>
