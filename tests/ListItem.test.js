import * as React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ListItem from '../src/components/ListItem';

configure({ adapter: new Adapter() });

describe('ListItem component', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('DIV');
    ReactDOM.render(<ListItem type={'folder'} name={'empty folder'}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders the folder info passed to it', () => {
    const wrapper = shallow(<ListItem type={'folder'} name={'empty folder'}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
