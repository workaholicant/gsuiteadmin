<template>
  <v-container fluid fill-height justify-center class="summary-panel">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            Percentage of Users on 2 Step Verification
          </v-card-title>
          <v-card-text>
            {{ twoSVRate }} %
          </v-card-text>
        </v-card>
        <v-card class="mt-3">
          <v-card-title primary-title>
            All Users
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="allUsers"
              hide-actions
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.fullName }}</td>
                <td class="text-xs-right">{{ props.item.primaryEmail }}</td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style src="./summary.css" scoped></style>
<script src="./summary.js"></script>
