import FavoritsFilms from '../FavoritsFilms';
import mapStateToProps from '../../store/mapStateToProps';
import { connect } from 'react-redux';

const FavoritsFilmsW = connect(mapStateToProps('FavoritsFilms'), null)(FavoritsFilms);

export default FavoritsFilmsW;