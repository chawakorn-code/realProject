<template>
    <v-main>
        <v-container>
            <v-card>
                <v-container>
                    <v-card-title>Hello</v-card-title>
                    <v-row align-content>
                        <v-col cols="12" sm="6">
                            <v-form>
                                <v-text-field v-model="codeItem" label="รหัส" outlined dense></v-text-field>
                            </v-form>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-form>
                                <v-text-field v-model="barcodeItem" label="รหัส barcode" outlined dense></v-text-field>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-container>
    </v-main>
</template>

<script>
export default {

}
</script>

<style>

</style>