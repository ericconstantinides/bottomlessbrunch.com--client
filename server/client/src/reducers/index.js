import { reducer as formReducer } from 'redux-form'
import RegionsReducer from './RegionsReducer'
import VenuesReducer from './VenuesReducer'
import EditVenueFieldsReducer from './EditVenueFieldsReducer'
import UiReducer from './UiReducer'
import MainMapReducer from './MainMapReducer'
import FilterReducer from './FilterReducer'
import AdminReducer from './AdminReducer'

const reducers = {
  regions: RegionsReducer,
  venues: VenuesReducer,
  editVenueFields: EditVenueFieldsReducer,
  form: formReducer,
  ui: UiReducer,
  mainMap: MainMapReducer,
  filters: FilterReducer,
  admin: AdminReducer
}

export default reducers
