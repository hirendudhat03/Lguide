const initialState = {
  isLoading: false,
  AllCrimes: {},
  AllCrimeTypes: {},
  filteredCrimes: [],
  AllCrimeTypeDropdown: []
};
let myArr = [];
const crimes = (state = initialState, action) => {
  const {payload} = action;
  switch (action.type) {
    case 'GET_FIR_CRIME_REQUEST':
      return {...state, isLoading: true};
    case 'GET_FIR_CRIME_SUCCESS':
      let tempArr = Object.entries(payload.data);

      tempArr.filter((val, index) => {
        // (val.isSelected = false), (val.id = ++index);
        Object.entries(state.AllCrimeTypes).map((item) => {
          if (val[0] === item[0]) {
            (val.isSelected = false),
              (val.id = item[1].id),
              (val.color_code = item[1].color_code);
          }
        });
      });
      return {
        ...state,
        AllCrimes: payload.data,
        isLoading: false,
        filteredCrimes: tempArr,
      };
    case 'GET_FIR_CRIME_FAILURE':
      return {...state, isLoading: false};
    case 'ALL_CRIME_TYPES_REQUEST':
      return {...state, isLoading: true};
    case 'ALL_CRIME_TYPES_SUCCESS':
      let tempType = Object.entries(payload.data);
      let newArr = tempType.map((val) => {
        
        let crimeTypeLabel = val[0].replace(/_/g, ' ')
        let Obj = {label: crimeTypeLabel, value: val[1].id, sub_crime : val[1], isExpanded : false}
        return Obj
      })
      // console.log('newArr',newArr);
      return {...state, AllCrimeTypes: payload.data,AllCrimeTypeDropdown : newArr, isLoading: false};
    case 'ALL_CRIME_TYPES_FAILURE':
      return {...state, isLoading: false};
    case 'UPDATE_FILTEREDCRIMES_DATA':
      let tempData = state.filteredCrimes;
      tempData[payload.index].isSelected = !tempData[payload.index].isSelected;

      if (tempData[payload.index].isSelected === false) {
        console.log('tempData', tempData[payload.index][1]);
        tempData[payload.index][1].map((val) => {
          console.log('tempData', val);

          val.isSelected = false;
        });
      }

      return {...state, filteredCrimes: tempData};
    case 'UPDATE_FILTERED_SUB_CRIMES_DATA':
      const {crime, index, sub_crime} = payload.data;
      let arr = [...state.filteredCrimes];
      arr.map((val) => {
        if (val[0] === crime) {
          val[1].map((item) => {
            if (item.sub_type !== null) {
              if (item.sub_type === sub_crime) {
                item.isSelected = !item.isSelected;
              }
            }
          });
        }
      });
      return {filteredCrimes: arr, isLoading: false};
    default:
      return state;
  }
};

export default crimes;
