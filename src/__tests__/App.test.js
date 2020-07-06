import {
  changeLocation
} from '../Actions';
   
describe('actions', function() {
  describe('changeLocation', function () {
    it('should have a type of "CHANGE_LOCATION"', function() {
      expect(changeLocation().type).toEqual('CHANGE_LOCATION');
    });
  });
});