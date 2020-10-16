import Header from '../Header';
import mapStateToProps from '../../store/mapStateToProps';
import mapDispatchToProps from '../../store/mapDispatchToProps';

import { connect } from 'react-redux';

const HeaderW = connect(mapStateToProps('Header'), mapDispatchToProps('Header'))(Header);

export default HeaderW;