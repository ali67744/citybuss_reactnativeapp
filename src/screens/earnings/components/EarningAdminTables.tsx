import React from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import log from '../../../utils/logs';
const EarningAdminTables = ({title='TITLE',res}) => {
  log('Res', res);
  return <View style={{marginTop:20}}>
    <Text style={styles.title}>{title}</Text>

     <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Currency</Text>
        <Text style={styles.headerText}>Total</Text>
        <Text style={styles.headerText}>Stipend</Text>
      </View>

      <FlatList
        data={res}
        keyExtractor={(item) => item.currency}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.currency}</Text>
            <Text style={styles.cell}>{item.total}</Text>
            <Text style={styles.cell}>{item.stipend}</Text>
          </View>
        )}
      />
    </View>
    </View>
};
export default EarningAdminTables;
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
