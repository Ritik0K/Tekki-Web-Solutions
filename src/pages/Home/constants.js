const tableConfig = {
  columnList: [
    {
      accessor: "id",
      columnName: "UserId",
      sortable: true,
    },
    {
      accessor: "name",
      columnName: "Name",
      sortable: true,
      searchable :true
    },
    {
      accessor: "username",
      columnName: "User Name",
      sortable: true,
      searchable :true
    },
    {
      accessor: "email",
      columnName: "E-mail",
      sortable: true,
    },
    {
      accessor: "address",
      columnName: "Address",
      Cell :({cell}) =>{
        return cell.city;

        return cell.street + ", " + cell.suite + ', ' + cell.city + ", " + cell.zipcode  
      }
    },
    // {
    //     accessor: "phone",
    //     columnName: "Phone",
    //   },
    //   {
    //     accessor: "website",
    //     columnName: "Website",
    //     sortAble: true,
    //   },
    //   {
    //     accessor: "company",
    //     columnName: "Company",
    //     sortAble: true,
    //     Cell :({cell}) =>{
    //       return cell.name 
    //     }
    //   },
  ],
  searchEnabled : true,
  numberOfRows : [5,10,15,20]
};

export default tableConfig;
