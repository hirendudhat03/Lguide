import {
  blue_marker,
  green_marker,
  dark_blue_marker,
  orange_marker,
  pink_marker,
  saffron_marker,
} from '../assets';

export const setColorAndImageOnCrimes = (crimeName) => {
  let Obj = {
    crimeColor: '#902222',
    crimeImg: saffron_marker,
  };
  switch (crimeName) {
    case 'Crime_against_women':
      Obj.crimeImg = blue_marker;
      Obj.crimeColor = '#007AFF';
      return Obj;
    case 'Crime_against_body':
      Obj.crimeImg = green_marker;
      Obj.crimeColor = '#64DEA8';
      return Obj;
    case 'Casteism':
      Obj.crimeImg = dark_blue_marker;
      Obj.crimeColor = '#223790';
      return Obj;
    case 'Vices':
      Obj.crimeImg = orange_marker;
      Obj.crimeColor = '#FD8600';
      return Obj;
    case 'Traffic_violation':
      Obj.crimeImg = pink_marker;
      Obj.crimeColor = '#E74A69';
      return Obj;
    default:
      return Obj;
  }
};
