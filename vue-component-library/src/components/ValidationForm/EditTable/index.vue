
<template>
    <div class="card">
        <div class="card-body">
        <div class="row d-flex justify-content-between algin-items-center">
          <div class="col"></div>
          <div class="col-5">
            <slot name="header"/>
          </div>
        </div>
            <b-table-simple hover  responsive>
                <!-- <Headers :headers="headers" /> -->
                <b-tbody>
                    <template
                        v-for="(item ) in editItems"
                    >
                        <tr
                            v-if="item.show"
                            :key="item.id"
                        >
                          <template v-for="(header) in headers">
                            <template
                                  v-if="header.key"
                              >
                              <!-- slot -->
                                <td 
                                  v-if="slotExist(header.label+'-'+item[header.key])"
                                  :key="header.label + 'field'"
                                >
                                  <slot 
                                    :name="header.label+'-'+item[header.key]" 
                                    :item="item" 
                                  />
                                </td>
                              <!-- slot -->
                              <!-- value -->
                                <td 
                                  v-else
                                  :key="header.label + 'field'"
                                >
                                    <h6> {{item[header.key] }}</h6>
                                </td>
                              <!-- value -->


                                <td :key="header.key + 'val'">
                                  <template v-if="!item.editMode">
                                    <template 
                                      v-if="slotExist(header.key+'-'+item[header.key])"
                                    >
                                      <slot 
                                        :name="header.key+'-'+item[header.key]" 
                                        :item="item" 
                                      />
                                    </template>
                                    <template v-else>
                                        {{item.value }}
                                    </template>
                                  </template>
                                  <SoloForm
                                      v-else
                                      :ref="`${item.name}Form`"
                                      v-model="item.value"
                                      :schema="item.schema"
                                      @submit-form="closeEditMode(item.name)"
                                  />
                                </td>
                                <td :key="header.key + 'action'">
                                    <template 
                                      v-if="slotExist('action'+'-'+item[header.key])"
                                    >
                                      <slot 
                                        :name="'action'+'-'+item[header.key]" 
                                        :item="item" 
                                      />
                                    </template>
                                    <template v-else>
                                      <Actions 
                                        v-bind="{
                                              directEdit: item.directEdit,
                                              allowEdit: item.allowEdit,
                                              editMode:item.editMode
                                          }"
                                          @close-mode="closeEditMode(item.name)"
                                          @open-mode="openEditMode(item.name)" 
                                      />
                                    </template>
                                </td>

                            </template>
                              
                          </template>

                        </tr>
                    </template>
                </b-tbody>
            </b-table-simple>
        </div>
    </div>
 </template>

<script src="./EditTable.js"></script>

<style lang="css" scoped>
.input{
  animation-name: shakeError;
  animation-fill-mode: forwards;
  animation-duration: .3s;
  animation-timing-function: ease-in-out; 
  }


@keyframes shakeError {
  0% {
    transform: translateX(0); }
  15% {
    transform: translateX(0.375rem); }
  30% {
    transform: translateX(-0.375rem); }
  45% {
    transform: translateX(0.375rem); }
  60% {
    transform: translateX(-0.375rem); }
  75% {
    transform: translateX(0.375rem); }
  90% {
    transform: translateX(-0.375rem); }
  100% {
    transform: translateX(0); } 
 }
</style>