import FilmItem from '../FilmItem';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';
import { connect } from 'react-redux';

const FilmItemW = connect(mapStateToProps('FavoritsFilms'), mapDispatchToProps('FilmItem'))(FilmItem);

export default FilmItemW;