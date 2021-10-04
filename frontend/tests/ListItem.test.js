import * as React from 'react';
import ReactDOM from 'react-dom';
import toJson from 'enzyme-to-json';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FileLI from '../src/components/FileLI';

configure({ adapter: new Adapter() });

describe('FileLI component', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('DIV');
    ReactDOM.render(<FileLI type={'folder'} name={'empty folder'}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders the folder info passed to it', () => {
    const wrapper = shallow(<FileLI type={'folder'} name={'empty folder'}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
