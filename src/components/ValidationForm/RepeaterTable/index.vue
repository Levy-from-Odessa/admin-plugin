
<template>
    <div class="card">
        <div class="card-body">
          <div
            v-for="(field ) in fields"
            :key="field.id"
            class="row justify-content-center" 
          >
            <div class="mb-4 col-lg-2">
              <label for="name">Name</label>
              <input
                v-model="field.name"
                type="text"
                name="untyped-input"
                class="form-control"
              />
            </div>
            <div class="mb-4 col-lg-2">
              <label for="name">Name</label>
              <input
                v-model="field.name"
                type="text"
                name="untyped-input"
                class="form-control"
              />
            </div>



            <div class="col-lg-2 align-self-center">
              <div class="d-grid">
                <input
                  type="button"
                  class="btn btn-success mt-3 mt-lg-0"
                  value="Add"
                  @click="AddformData"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->
</template>



<script>

/**
 * Form-repeater Component
 */
export default {
  name: 'FtthValRepeaterTable',
  page: {
    title: "Form Repeater",
    meta: [{ name: "description", content: 'appConfig.description' }],
  },
  components: {
    },
  data() {
    return {
      title: "Form Repeater",
      items: [
        {
          text: "Forms",
          href: "/",
        },
        {
          text: "Form Repeater",
          active: true,
        },
      ],
      fields: [{ id: 1 }],
      phoneData: [{ id: 1 }],
    };
  },

  methods: {
    /**
     * Push the row in form
     */
    AddformData() {
      this.fields.push({ name: "", email: "", subject: "", message: "" });
    },
    /**
     * Delete the row
     */
    deleteRow(index) {
      if (confirm("Are you sure you want to delete this element?"))
        this.fields.splice(index, 1);
    },
    /**
     * Add the phone number in form
     */
    AddPhoneNo() {
      this.phoneData.push({ phone: "" });
    },
    /**
     * Delete the row from form
     */
    deletePhone(index) {
      this.phoneData.splice(index, 1);
    },
  },
};
</script>
