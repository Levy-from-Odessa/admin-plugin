
<template>
    <div class="card EditTable">
        <div class="card-body">
          <div class="row d-flex justify-content-between algin-items-center">
            <div class="col"></div>
            <div class="col-5">
              <slot name="header"/>
            </div>
          </div>
            <b-table-simple hover >
                <b-tbody>
                    <template
                        v-for="(item ) in editItems"
                    >
                        <tr
                            v-if="item.show"
                            :key="item.id + item.name"
                        >
                            <template 
                              v-for="header in headers" 
                            >
                            <!--
                              FLEX TD depend on header.key 
                                slot - {{header.key}} - {{item.name}} 
                                default - {{item[header.key]}}
                            -->
                              <template
                                v-if="header.key !== 'value' && header.key !== 'action'"  
                              >
                                <td 
                                  :key="header.key + '-' +  item.name"
                                  v-if="slotExist(header.key + '-' +  item.name)"
                                >
                                  <div class="td-content">
                                    <slot 
                                      :name="header.key + '-' +  item.name" 
                                      :item="item" 
                                    />
                                  </div>
                                </td>
                                <td 
                                  v-else
                                  :key="header.key + '-' +  item.name"
                                  class="w-10"
                                >
                                  <div class="td-content">
                                    <h6>  {{item[header.key] }}:</h6>
                                  </div>
                                </td>
                              <!-- FLEX TD -->
                              </template>

                              <template v-if="header.key === 'value'">

                                <!-- 
                                  VALUE TD
                                    always item.value
                                    slot - value-{{item.name}}
                                    default - {{ item[header.key] | dynamic(item.fieldType)  }}
                                 -->
                                <td 
                                  :key="header.key + '-' + item.name "
                                  class="w-50"
                                >
                                  <div class="td-content">
                                    <template v-if="!item.editMode && !item.directEdit">
                                      <!-- {{header.key + '-' + item.name}} -->
                                      <template 
                                        v-if="slotExist(header.key + '-' + item.name)"
                                      >
                                        <slot 
                                          :name="header.key + '-' + item.name" 
                                          :item="item" 
                                        />
                                      </template>
                                      <template v-else>
                                          {{ item[header.key] | dynamic(item.fieldType)   }}
                                      </template>
                                    </template>
                                    <!-- 
                                      EDIT TD
                                        always  soloform by schema
                                        slot - value-form-{{item.name}}
                                        default - <SoloForm/>
                                    -->
                                    <template v-else>
                                      <template 
                                        v-if="slotExist(header.key + '-form' + '-' + item.name)"
                                      >
                                        <slot 
                                          :name="header.key + '-form' + '-' + item.name" 
                                          :item="item" 
                                        />
                                          <!-- :submit-form="closeEditMode(item.name)" -->
                                      </template>
                                      <template v-else>
                                        <SoloForm
                                            :ref="`${item.name}Form`"
                                            v-model="item.value"
                                            :schema="item.schema"
                                            @submit-form="closeEditMode(item.name)"
                                        />
                                      </template>
                                    </template>
                                  </div>
                                </td>
                                <!-- VALUE TD -->
                              </template>

                              <template v-if="header.key === 'action'">
                                <!-- 
                                  ACTION TD
                                    always item.action, btn wich toggle edit mode
                                    slot - action-{{item.name}}
                                    default - BTN
                                 -->
                                <td :key="header.key + '-' + item.name">
                                  <div class="td-content">
                                    <template 
                                      v-if="slotExist(header.key + '-' + item.name)"
                                    >
                                      <slot 
                                        :name="header.key + '-' + item.name" 
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
                                  </div>
                                </td>
                                <!-- ACTION TD --->
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

<style lang="scss" scoped>
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


.EditTable{
  .table-responsive{
    tbody{
      tr{
        td{
          padding: 0 !important;
          .td-content{
            padding: 5px;
            min-height: 50px;
            h6{
              font-size: 15px;
              font-weight: 800;
              color: rgba(4, 4, 90, 0.76);
            }
          }
        }
      }
    }
  }
}
</style>