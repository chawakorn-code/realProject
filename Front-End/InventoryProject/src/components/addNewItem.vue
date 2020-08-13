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
                                    <v-text-field v-model="codeItem"  label="รหัส" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-text-field v-model="codeItem" label="รหัส barcode" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="12">
                                <v-form>
                                    <v-text-field v-model="name" label="รายการ" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-select
                                    v-model="categoryOption.id"
                                    :items="categoryOption"
                                    item-text="category"
                                    item-value="id"
                                    label="หมวดหมู่"
                                    dense
                                    solo
                                    ></v-select>
                                </v-form>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-select
                                    v-model="itemLocation.locationID"
                                    :items="itemLocation"
                                    item-text="name"
                                    item-value="locationID"
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
                                    <v-text-field  v-model ="unit" label="หน่วยรับ" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-text-field v-model="min" label="ค่าต่ำสุด" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-text-field v-model="max" label="ค่าสูงสุด" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-text-field  v-model="amount" label="จำนวนที่มีในสต๊อก(ยอดคงเหลือ)" outlined dense></v-text-field>
                                </v-form>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-form>
                                    <v-select
                                    v-model="itemStatus.value"
                                    :items="itemStatus"
                                    item-text="text"
                                    item-value="value"
                                    label="สถานะ"
                                    dense
                                    solo
                                    ></v-select>
                                </v-form>
                            </v-col>
                        </v-row>
                        <!-- <v-row>
                            <v-col cols="12">
                                <v-text-field  label="หมายเหตุ" outlined dense></v-text-field>
                            </v-col>
                        </v-row> -->
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-btn block large dense color="success" v-on:click="submitItem" type="submit">บันทึก</v-btn>
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
            codeItem: '',
            pic: '',
            name: '',
            price: '',
            unit:'',
            min:'',
            max:'',
            amount:'',
            categoryOption: [],
            itemLocation: [],
            itemStatus: [
                {text: 'เบิกได้', value: 'เบิกได้'},
                {text: 'งดเบิก', value: 'งดเบิก'},
            ],
        }
    },
    mounted () {
        this.getCategory()
        this.getItemLocation()
    },
    methods: {
        getCategory () {
            axios.get('http://localhost:3000/category').then(
                result => {
                    this.categoryOption = result.data
                }
            ),
            error => {
                console.error(error)
            }
        },
        getItemLocation () {
            axios.get('http://localhost:3000/location').then(
                result => {
                    this.itemLocation = result.data
                }
            ),
            error => {
                console.error(error)
            }
        },
       async submitItem () { 
            console.log(
            " name:" + this.name,
            "code: " + this.codeItem,
            "price: " + this.price,
            "amount: " + this.amount,
            "min: " + this.min,
            "max: " + this.max,
            "category: " +this.categoryOption.id,
            "status: " + this.itemStatus.value,
            "Location: " + this.itemLocation.locationID,
            "unit: " +this.unit)
            axios.post('http://localhost:3000/inventory',
            {
                name: this.name,
                pic: '',
                price: this.price,
                unit: this.unit,
                min: this.min,
                max: this.max,
                amount: this.amount,
                itemLocation: this.itemLocation.locationID,
                categoryOption: this.categoryOption.id,
                itemStatus: this.itemStatus.value,   
            }
            ).then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            })
        },
    }
}
</script>

<style>

</style>