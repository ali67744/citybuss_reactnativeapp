import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import log from '../../../utils/logs';
const EarningUserTables = ({title='TITLE',res}) => {
  log('Res', res);
  return (
    <View style={{marginTop:20}}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.container}>
      {/* Table Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Cashier</Text>
        <Text style={styles.headerText}>Number of Tickets</Text>
        <Text style={styles.headerText}>Currency 1</Text>
        <Text style={styles.headerText}>Currency 2</Text>
        <Text style={styles.headerText}>Stipend</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        data={res}
        keyExtractor={(item) => item.full_name + item.num_of_tickets}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.full_name}</Text>
            <Text style={styles.cell}>{item.num_of_tickets}</Text>
            <Text style={styles.cell}>{item.currency_1}</Text>
            <Text style={styles.cell}>{item.currency_2}</Text>
            <Text style={styles.cell}>{item.stipend}</Text>
          </View>
        )}
      />
    </View>
    </View>
  );
};
export default EarningUserTables;
const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderWidth: 1,
        borderColor: "#ddd",
      },
      header: {
        flexDirection: "row",
        backgroundColor: "#f4f4f4",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
      },
      headerText: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
      },
      row: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
      },
      cell: {
        flex: 1,
        textAlign: "center",
      },
      title:{
        fontSize:16,color:'#000000',marginHorizontal:10,fontWeight:'bold',
        textAlign: "center",
      }
});
