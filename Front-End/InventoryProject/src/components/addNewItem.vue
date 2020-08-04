<template>
    <v-main>
        <v-container>
            <v-card>
                <v-container>
                    <v-card-title>
                        <h3>เพิ่มรายการวัสดุ - อุปกรณ์</h3>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-card-text>
                        <v-row >
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-text-field v-model="codeItem" label="รหัส" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-text-field v-model="barcodeItem" label="รหัส barcode" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="12">
                                <v-form>
                                    <v-text-field  label="รายการ" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-select
                                    :items="categoryOption"
                                    label="หมวดหมู่"
                                    dense
                                    solo
                                    ></v-select>
                                </v-form>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-select
                                    :item="items"
                                    label="สถานที่จัดเก็บ"
                                    dense
                                    solo
                                    ></v-select>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-text-field  v-model="price" label="ราคา มาตรฐาน(ต้นทุน/หน่วย)" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                            <v-col>
                                <v-form>
                                    <v-text-field  label="หน่วยรับ" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-text-field label="ค่าต่ำสุด" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-text-field label="ค่าสูงสุด" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-text-field  label="จำนวนที่มีในสต๊อก(ยอดคงเหลือ)" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-select
                                    :item="items"
                                    label="สถานะ"
                                    dense
                                    solo
                                    ></v-select>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field  label="หมายเหตุ" outlined dense></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row :align="align" :justify="justify">
                            <v-col cols="12" sm="6">
                                <v-btn block large dense color="success">บันทึก</v-btn>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-btn block large dense color="error">ยกเลิก</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-container>
            </v-card>
        </v-container>
    </v-main>
</template>

<script>
import axios from 'axios'
export default { 
    data () {
        return {
            categoryOption: [],
        }
    },
    mounted () {
        this.getCategory()
    },
    methods: {
        getCategory () {
            axios.get('http://localhost:3000/select/category').then(
                result => {
                    var objData = new Array()
                    let i
                    for ( i = 0; i < result.data.length ; i++){
                        objData[i] = JSON.stringify(result.data[i].category)
                        console.log(objData[i])
                    }
                    this.categoryOption = objData
                    console.log(result)
                }
            ),
            error => {
                console.error(error)
            }
        },
    }
}
</script>

<style>

</style>