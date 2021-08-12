import * as React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as reactRedux from 'react-redux';
import BucketDisplay from '../src/components/BucketDisplay';

configure({ adapter: new Adapter() });

const buckets = [
  { Name: '1.newBucket', Region: 'us-east-1', CreationDate: '2021-06-15T15:50:10.000Z' },
  { Name: 'cf-templates-1ringo9ne14-us-east-1', Region: 'us-east-1', CreationDate: '2020-08-11T00:22:08.000Z' },
  { Name: 'elasticbeanstalk-us-east-1-897278278762', Region: 'us-east-1', CreationDate: '2020-08-13T18:36:57.000Z' },
  { Name: 'logs.misterpea.me', Region: 'us-east-2', CreationDate: '2020-02-23T21:01:23.000Z' },
  { Name: 'misterpea.me', Region: 'us-east-2', CreationDate: '2020-02-23T19:57:48.000Z' },
  { Name: 'misterpea.me-emails', Region: 'us-east-1', CreationDate: '2021-01-25T03:06:10.000Z' },
  { Name: 'new-ass-bucket', Region: 'us-east-1', CreationDate: '2021-04-15T13:48:06.000Z' },
  { Name: 'topStories.misterpea.me', Region: 'us-east-2', CreationDate: '2020-04-09T22:56:59.000Z' },
  { Name: 'www.misterpea.me', Region: 'us-east-2', CreationDate: '2020-02-23T19:59:01.000Z' },
];

describe('Bucket Display Component', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  useSelectorMock.mockReturnValue(buckets);

  it('Renders without crashing', () => {
    const div = document.createElement('DIV');
    ReactDOM.render(<BucketDisplay />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders the content of buckets array', () => {
    const wrapper = shallow(<BucketDisplay />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
