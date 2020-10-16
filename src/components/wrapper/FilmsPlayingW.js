import FilmsPlaying from '../FilmsPlaying';
import mapStateToProps from '../../store/mapStateToProps';
import { connect } from 'react-redux';

const FilmsPlayingW = connect(mapStateToProps('FilmsPlaying'), null)(FilmsPlaying);

export default FilmsPlayingW;