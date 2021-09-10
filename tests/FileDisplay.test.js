import * as React from 'react';
import ReactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import FileDisplay from '../src/components/FileDisplay';

configure({ adapter: new Adapter() });

const buckets = [{ Name: '1.newbucket', Region: 'us-east-1', CreationDate: '2021-06-15T15:50:10.000Z' }, { Name: 'cf-templates-1rrngkxo9ne14-us-east-1', Region: 'us-east-1', CreationDate: '2020-08-11T00:22:08.000Z' }, { Name: 'elasticbeanstalk-us-east-1-897278278762', Region: 'us-east-1', CreationDate: '2020-08-13T18:36:57.000Z' }, { Name: 'logs.misterpea.me', Region: 'us-east-2', CreationDate: '2020-02-23T21:01:23.000Z' }, {
  Name: 'misterpea.me',
  Region: 'us-east-2',
  CreationDate: '2020-02-23T19:57:48.000Z',
  contents: [{
    type: 'folder',
    name: 'css',
    path: '/css',
    children: [{
      type: 'file', name: 'Application.tvdb', lastModified: '2021-05-07T00:26:37.000Z', size: 258, path: '/css',
    }, {
      type: 'file', name: 'Library Preferences.tvdb', lastModified: '2021-05-07T00:27:20.000Z', size: 913, path: '/css',
    }, {
      type: 'file', name: 'Library.tvdb', lastModified: '2021-05-07T00:28:58.000Z', size: 43478, path: '/css',
    }, {
      type: 'file', name: 'about.css', lastModified: '2020-02-23T21:07:56.000Z', size: 16329, path: '/css',
    }, {
      type: 'file', name: 'advertisingvideo.css', lastModified: '2020-02-23T21:07:56.000Z', size: 19727, path: '/css',
    }, {
      type: 'file', name: 'boilerplate.css', lastModified: '2020-02-23T21:07:56.000Z', size: 10986, path: '/css',
    }, {
      type: 'file', name: 'illustration.css', lastModified: '2020-02-23T21:07:56.000Z', size: 13921, path: '/css',
    }, {
      type: 'file', name: 'index.css', lastModified: '2020-02-23T21:07:57.000Z', size: 18655, path: '/css',
    }, {
      type: 'file', name: 'lg-fb-comment-box.css', lastModified: '2020-02-23T21:07:57.000Z', size: 1083, path: '/css',
    }, {
      type: 'file', name: 'lg-fb-comment-box.css.map', lastModified: '2020-02-23T21:07:57.000Z', size: 644, path: '/css',
    }, {
      type: 'file', name: 'lg-transitions.css', lastModified: '2020-02-23T21:07:57.000Z', size: 47195, path: '/css',
    }, {
      type: 'file', name: 'lg-transitions.css.map', lastModified: '2020-02-23T21:07:57.000Z', size: 17134, path: '/css',
    }, {
      type: 'file', name: 'lightgallery.css', lastModified: '2020-02-23T21:07:57.000Z', size: 20861, path: '/css',
    }, {
      type: 'file', name: 'lightgallery.css.map', lastModified: '2020-02-23T21:07:57.000Z', size: 13227, path: '/css',
    }, {
      type: 'file', name: 'package-lock.json', lastModified: '2021-05-07T17:33:55.000Z', size: 84090, path: '/css',
    }, {
      type: 'file', name: 'realbook1C-reg.pdf', lastModified: '2021-05-07T02:22:10.000Z', size: 46199720, path: '/css',
    }, {
      type: 'file', name: 'swfPages.css', lastModified: '2020-02-23T21:07:58.000Z', size: 9172, path: '/css',
    }],
  }, {
    type: 'folder',
    name: 'fonts',
    path: '/fonts',
    children: [{
      type: 'file', name: 'lg.eot', lastModified: '2020-02-23T21:07:58.000Z', size: 2904, path: '/fonts',
    }, {
      type: 'file', name: 'lg.svg', lastModified: '2020-02-23T21:07:58.000Z', size: 4689, path: '/fonts',
    }, {
      type: 'file', name: 'lg.ttf', lastModified: '2020-02-23T21:07:58.000Z', size: 2760, path: '/fonts',
    }, {
      type: 'file', name: 'lg.woff', lastModified: '2020-02-23T21:07:58.000Z', size: 2836, path: '/fonts',
    }, {
      type: 'file', name: 'package-lock.json', lastModified: '2021-05-07T17:35:18.000Z', size: 84090, path: '/fonts',
    }],
  }, {
    type: 'folder',
    name: 'img',
    path: '/img',
    children: [{
      type: 'file', name: 'Jenkinsfile', lastModified: '2021-05-07T19:28:41.000Z', size: 535, path: '/img',
    }, {
      type: 'file', name: 'MRPline.svg', lastModified: '2020-02-23T21:07:22.000Z', size: 2206, path: '/img',
    }, {
      type: 'file', name: 'MRPlineBlu.svg', lastModified: '2020-02-23T21:07:22.000Z', size: 2082, path: '/img',
    }, {
      type: 'folder',
      name: 'ads',
      path: '/img/ads',
      children: [{
        type: 'file', name: 'BeatTheReaper160x600.mp4', lastModified: '2020-02-23T21:07:30.000Z', size: 1953371, path: '/img/ads',
      }, {
        type: 'file', name: 'BeatTheReaper300x250.mp4', lastModified: '2020-02-23T21:07:27.000Z', size: 1744877, path: '/img/ads',
      }, {
        type: 'file', name: 'BeatTheReaper728x90.mp4', lastModified: '2020-02-23T21:07:31.000Z', size: 1415623, path: '/img/ads',
      }, {
        type: 'file', name: 'MB.jpg', lastModified: '2021-08-12T19:28:57.000Z', size: 25101, path: '/img/ads',
      }, {
        type: 'file', name: 'afterCam300x250.mp4', lastModified: '2020-02-23T21:07:25.000Z', size: 561411, path: '/img/ads',
      }, {
        type: 'file', name: 'cheatingDeath336x280.mp4', lastModified: '2020-02-23T21:07:31.000Z', size: 1373809, path: '/img/ads',
      }, {
        type: 'file', name: 'cheatingDeath728x90.mp4', lastModified: '2020-02-23T21:07:27.000Z', size: 1243854, path: '/img/ads',
      }, {
        type: 'file', name: 'connected300x250.mp4', lastModified: '2020-02-23T21:07:29.000Z', size: 741108, path: '/img/ads',
      }, {
        type: 'file', name: 'connected728x90.mp4', lastModified: '2020-02-23T21:07:29.000Z', size: 1375406, path: '/img/ads',
      }, {
        type: 'file', name: 'davidAndGoliath300x250.mp4', lastModified: '2020-02-23T21:07:30.000Z', size: 209465, path: '/img/ads',
      }, {
        type: 'file', name: 'davidAndGoliath728x90.mp4', lastModified: '2020-02-23T21:07:30.000Z', size: 227356, path: '/img/ads',
      }, {
        type: 'file', name: 'dumbWorld160x600.mp4', lastModified: '2020-02-23T21:07:32.000Z', size: 2054576, path: '/img/ads',
      }, {
        type: 'file', name: 'dumbWorld300x250.mp4', lastModified: '2020-02-23T21:07:33.000Z', size: 1820991, path: '/img/ads',
      }, {
        type: 'file', name: 'dumbWorld728x90.mp4', lastModified: '2020-02-23T21:07:35.000Z', size: 2908008, path: '/img/ads',
      }, {
        type: 'file', name: 'ladyGaga160x600.mp4', lastModified: '2020-02-23T21:07:33.000Z', size: 725466, path: '/img/ads',
      }, {
        type: 'file', name: 'ladyGaga300x250.mp4', lastModified: '2020-02-23T21:07:33.000Z', size: 523582, path: '/img/ads',
      }, {
        type: 'file', name: 'lichess.org • Free Online Chess.webloc', lastModified: '2021-08-12T19:30:17.000Z', size: 73, path: '/img/ads',
      }, {
        type: 'file', name: 'loveLostSpaghetti160x600.mp4', lastModified: '2020-02-23T21:07:35.000Z', size: 3119693, path: '/img/ads',
      }, {
        type: 'file', name: 'loveLostSpaghetti300x250.mp4', lastModified: '2020-02-23T21:07:36.000Z', size: 3071980, path: '/img/ads',
      }, {
        type: 'file', name: 'loveLostSpaghetti728x90.mp4', lastModified: '2020-02-23T21:07:43.000Z', size: 2371970, path: '/img/ads',
      }, {
        type: 'file', name: 'quietRoom160x600.mp4', lastModified: '2020-02-23T21:07:35.000Z', size: 783289, path: '/img/ads',
      }, {
        type: 'file', name: 'quietRoom300x250.mp4', lastModified: '2020-02-23T21:07:36.000Z', size: 1201502, path: '/img/ads',
      }, {
        type: 'file', name: 'quietRoom728x90v1.mp4', lastModified: '2020-02-23T21:07:36.000Z', size: 1088692, path: '/img/ads',
      }, {
        type: 'file', name: 'sugarFrosted300x250.mp4', lastModified: '2020-02-23T21:07:38.000Z', size: 2101404, path: '/img/ads',
      }, {
        type: 'file', name: 'sugarFrosted300x600v3.mp4', lastModified: '2020-02-23T21:07:40.000Z', size: 2084683, path: '/img/ads',
      }, {
        type: 'file', name: 'sugarFrosted728x90.mp4', lastModified: '2020-02-23T21:07:45.000Z', size: 1686469, path: '/img/ads',
      }, {
        type: 'file', name: 'theyEatPuppies300x250.mp4', lastModified: '2020-02-23T21:07:40.000Z', size: 781145, path: '/img/ads',
      }, {
        type: 'file', name: 'theyEatPuppies300x600.mp4', lastModified: '2020-02-23T21:07:40.000Z', size: 489065, path: '/img/ads',
      }, {
        type: 'file', name: 'theyEatPuppies728x90.mp4', lastModified: '2020-02-23T21:07:41.000Z', size: 338482, path: '/img/ads',
      }],
    }, {
      type: 'file', name: 'closeButton.svg', lastModified: '2020-02-23T21:07:21.000Z', size: 482, path: '/img',
    }, {
      type: 'file', name: 'diag.svg', lastModified: '2020-02-23T21:07:22.000Z', size: 311, path: '/img',
    }, {
      type: 'file', name: 'dot.svg', lastModified: '2020-02-23T21:07:21.000Z', size: 177, path: '/img',
    }, {
      type: 'file', name: 'external.png', lastModified: '2020-02-23T21:07:22.000Z', size: 993, path: '/img',
    }, {
      type: 'file', name: 'galFront.jpg', lastModified: '2020-02-23T21:07:22.000Z', size: 62098, path: '/img',
    }, {
      type: 'file', name: 'galFrontAd.jpg', lastModified: '2020-02-23T21:07:22.000Z', size: 56989, path: '/img',
    }, {
      type: 'folder',
      name: 'galProjects',
      path: '/img/galProjects',
      children: [{
        type: 'file', name: 'ConnectedSpread.png', lastModified: '2020-02-23T21:07:52.000Z', size: 38593, path: '/img/galProjects',
      }, {
        type: 'file', name: 'afterCam.png', lastModified: '2020-02-23T21:07:52.000Z', size: 34124, path: '/img/galProjects',
      }, {
        type: 'file', name: 'beatTheReaper.png', lastModified: '2020-02-23T21:07:52.000Z', size: 42221, path: '/img/galProjects',
      }, {
        type: 'file', name: 'cheatingDeath.png', lastModified: '2020-02-23T21:07:52.000Z', size: 37477, path: '/img/galProjects',
      }, {
        type: 'file', name: 'davidGoliath.png', lastModified: '2020-02-23T21:07:52.000Z', size: 31851, path: '/img/galProjects',
      }, {
        type: 'file', name: 'eatPuppies.png', lastModified: '2020-02-23T21:07:52.000Z', size: 69909, path: '/img/galProjects',
      }, {
        type: 'file', name: 'ladyGaga.png', lastModified: '2020-02-23T21:07:52.000Z', size: 40538, path: '/img/galProjects',
      }, {
        type: 'file', name: 'loveLostSpag.png', lastModified: '2020-02-23T21:07:53.000Z', size: 85210, path: '/img/galProjects',
      }, {
        type: 'file', name: 'ourDumbWorld.png', lastModified: '2020-02-23T21:07:53.000Z', size: 45002, path: '/img/galProjects',
      }, {
        type: 'file', name: 'quietRoom.png', lastModified: '2020-02-23T21:07:53.000Z', size: 36966, path: '/img/galProjects',
      }, {
        type: 'file', name: 'sugarFrosted.png', lastModified: '2020-02-23T21:07:53.000Z', size: 51886, path: '/img/galProjects',
      }],
    }, {
      type: 'folder',
      name: 'gallery',
      path: '/img/gallery',
      children: [{
        type: 'folder',
        name: 'cover',
        path: '/img/gallery/cover',
        children: [{
          type: 'file', name: '0FF55882-A414-4A27-966E-42452E6E61E9.jpeg', lastModified: '2021-05-02T13:42:25.000Z', size: 3136073, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'ArtOfFlyingCoverFinal.jpg', lastModified: '2020-02-23T21:07:53.000Z', size: 206936, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'ArtOfFlyingCoverFinal_thumb.jpg', lastModified: '2020-02-23T21:07:53.000Z', size: 13687, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'LittleFoxForestJACKET.jpg', lastModified: '2020-02-23T21:07:55.000Z', size: 510751, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'LittleFoxForestJACKET_thumb.jpg', lastModified: '2020-02-23T21:07:54.000Z', size: 13727, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'PeaceIsAnOffering.jpg', lastModified: '2020-02-23T21:07:55.000Z', size: 361200, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'PeaceIsAnOffering_thumb.jpg', lastModified: '2020-02-23T21:07:54.000Z', size: 16532, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'YoWereTheFirst.jpg', lastModified: '2020-02-23T21:07:56.000Z', size: 258374, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'YoWereTheFirst_thumb.jpg', lastModified: '2020-02-23T21:07:56.000Z', size: 15312, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'forgetMeNot.jpg', lastModified: '2020-02-23T21:07:54.000Z', size: 275743, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'forgetMeNot_thumb.jpg', lastModified: '2020-02-23T21:07:54.000Z', size: 15989, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'superManny.jpg', lastModified: '2020-02-23T21:07:55.000Z', size: 160069, path: '/img/gallery/cover',
        }, {
          type: 'file', name: 'superManny_thumb.jpg', lastModified: '2020-02-23T21:07:55.000Z', size: 14168, path: '/img/gallery/cover',
        }],
      }, {
        type: 'file', name: 'image01.jpg', lastModified: '2020-02-23T21:07:42.000Z', size: 160069, path: '/img/gallery',
      }, {
        type: 'file', name: 'image01thumb.jpg', lastModified: '2020-02-23T21:07:43.000Z', size: 11158, path: '/img/gallery',
      }, {
        type: 'file', name: 'image02.jpg', lastModified: '2020-02-23T21:07:43.000Z', size: 125420, path: '/img/gallery',
      }, {
        type: 'file', name: 'image02thumb.jpg', lastModified: '2020-02-23T21:07:43.000Z', size: 9599, path: '/img/gallery',
      }, {
        type: 'file', name: 'image03.jpg', lastModified: '2020-02-23T21:07:44.000Z', size: 162221, path: '/img/gallery',
      }, {
        type: 'file', name: 'image03thumb.jpg', lastModified: '2020-02-23T21:07:44.000Z', size: 11044, path: '/img/gallery',
      }, {
        type: 'file', name: 'image04.jpg', lastModified: '2020-02-23T21:07:44.000Z', size: 127987, path: '/img/gallery',
      }, {
        type: 'file', name: 'image04thumb.jpg', lastModified: '2020-02-23T21:07:44.000Z', size: 10453, path: '/img/gallery',
      }, {
        type: 'file', name: 'image05.jpg', lastModified: '2020-02-23T21:07:44.000Z', size: 125859, path: '/img/gallery',
      }, {
        type: 'file', name: 'image05thumb.jpg', lastModified: '2020-02-23T21:07:45.000Z', size: 10231, path: '/img/gallery',
      }, {
        type: 'file', name: 'image06.jpg', lastModified: '2020-02-23T21:07:45.000Z', size: 143618, path: '/img/gallery',
      }, {
        type: 'file', name: 'image06thumb.jpg', lastModified: '2020-02-23T21:07:45.000Z', size: 10327, path: '/img/gallery',
      }, {
        type: 'file', name: 'image07.jpg', lastModified: '2020-02-23T21:07:45.000Z', size: 67314, path: '/img/gallery',
      }, {
        type: 'file', name: 'image07thumb.jpg', lastModified: '2020-02-23T21:07:45.000Z', size: 8574, path: '/img/gallery',
      }, {
        type: 'file', name: 'image08.jpg', lastModified: '2020-02-23T21:07:45.000Z', size: 101103, path: '/img/gallery',
      }, {
        type: 'file', name: 'image08thumb.jpg', lastModified: '2020-02-23T21:07:45.000Z', size: 9920, path: '/img/gallery',
      }, {
        type: 'file', name: 'image09.jpg', lastModified: '2020-02-23T21:07:46.000Z', size: 116777, path: '/img/gallery',
      }, {
        type: 'file', name: 'image09thumb.jpg', lastModified: '2020-02-23T21:07:45.000Z', size: 5362, path: '/img/gallery',
      }, {
        type: 'file', name: 'image10.jpg', lastModified: '2020-02-23T21:07:46.000Z', size: 116893, path: '/img/gallery',
      }, {
        type: 'file', name: 'image10thumb.jpg', lastModified: '2020-02-23T21:07:46.000Z', size: 10279, path: '/img/gallery',
      }, {
        type: 'file', name: 'image11.jpg', lastModified: '2020-02-23T21:07:46.000Z', size: 80428, path: '/img/gallery',
      }, {
        type: 'file', name: 'image11thumb.jpg', lastModified: '2020-02-23T21:07:46.000Z', size: 9948, path: '/img/gallery',
      }, {
        type: 'file', name: 'image12.jpg', lastModified: '2020-02-23T21:07:46.000Z', size: 113137, path: '/img/gallery',
      }, {
        type: 'file', name: 'image12thumb.jpg', lastModified: '2020-02-23T21:07:46.000Z', size: 10432, path: '/img/gallery',
      }, {
        type: 'file', name: 'image13.jpg', lastModified: '2020-02-23T21:07:47.000Z', size: 123797, path: '/img/gallery',
      }, {
        type: 'file', name: 'image13thumb.jpg', lastModified: '2020-02-23T21:07:47.000Z', size: 9935, path: '/img/gallery',
      }, {
        type: 'file', name: 'image14.jpg', lastModified: '2020-02-23T21:07:47.000Z', size: 179065, path: '/img/gallery',
      }, {
        type: 'file', name: 'image14thumb.jpg', lastModified: '2020-02-23T21:07:47.000Z', size: 10943, path: '/img/gallery',
      }, {
        type: 'file', name: 'image15.jpg', lastModified: '2020-02-23T21:07:47.000Z', size: 120037, path: '/img/gallery',
      }, {
        type: 'file', name: 'image15thumb.jpg', lastModified: '2020-02-23T21:07:47.000Z', size: 10127, path: '/img/gallery',
      }, {
        type: 'file', name: 'image16.jpg', lastModified: '2020-02-23T21:07:47.000Z', size: 187584, path: '/img/gallery',
      }, {
        type: 'file', name: 'image16thumb.jpg', lastModified: '2020-02-23T21:07:47.000Z', size: 7835, path: '/img/gallery',
      }, {
        type: 'file', name: 'image17.jpg', lastModified: '2020-02-23T21:07:48.000Z', size: 154262, path: '/img/gallery',
      }, {
        type: 'file', name: 'image17thumb.jpg', lastModified: '2020-02-23T21:07:48.000Z', size: 8395, path: '/img/gallery',
      }, {
        type: 'file', name: 'image18.jpg', lastModified: '2020-02-23T21:07:48.000Z', size: 151222, path: '/img/gallery',
      }, {
        type: 'file', name: 'image18thumb.jpg', lastModified: '2020-02-23T21:07:48.000Z', size: 10901, path: '/img/gallery',
      }, {
        type: 'file', name: 'image19.jpg', lastModified: '2020-02-23T21:07:48.000Z', size: 197897, path: '/img/gallery',
      }, {
        type: 'file', name: 'image19thumb.jpg', lastModified: '2020-02-23T21:07:48.000Z', size: 6042, path: '/img/gallery',
      }, {
        type: 'file', name: 'image20.jpg', lastModified: '2020-02-23T21:07:48.000Z', size: 171466, path: '/img/gallery',
      }, {
        type: 'file', name: 'image20thumb.jpg', lastModified: '2020-02-23T21:07:49.000Z', size: 6006, path: '/img/gallery',
      }, {
        type: 'file', name: 'image21.jpg', lastModified: '2020-02-23T21:07:49.000Z', size: 238542, path: '/img/gallery',
      }, {
        type: 'file', name: 'image21a.jpg', lastModified: '2020-02-23T21:07:49.000Z', size: 53996, path: '/img/gallery',
      }, {
        type: 'file', name: 'image21athumb.jpg', lastModified: '2020-02-23T21:07:49.000Z', size: 5154, path: '/img/gallery',
      }, {
        type: 'file', name: 'image21thumb.jpg', lastModified: '2020-02-23T21:07:49.000Z', size: 8128, path: '/img/gallery',
      }, {
        type: 'file', name: 'image22.jpg', lastModified: '2020-02-23T21:07:49.000Z', size: 41766, path: '/img/gallery',
      }, {
        type: 'file', name: 'image22thumb.jpg', lastModified: '2020-02-23T21:07:49.000Z', size: 10092, path: '/img/gallery',
      }, {
        type: 'file', name: 'image23.jpg', lastModified: '2020-02-23T21:07:50.000Z', size: 88103, path: '/img/gallery',
      }, {
        type: 'file', name: 'image23thumb.jpg', lastModified: '2020-02-23T21:07:50.000Z', size: 9384, path: '/img/gallery',
      }, {
        type: 'file', name: 'image24.jpg', lastModified: '2020-02-23T21:07:50.000Z', size: 67853, path: '/img/gallery',
      }, {
        type: 'file', name: 'image24thumb.jpg', lastModified: '2020-02-23T21:07:50.000Z', size: 10193, path: '/img/gallery',
      }, {
        type: 'file', name: 'image25.jpg', lastModified: '2020-02-23T21:07:50.000Z', size: 183236, path: '/img/gallery',
      }, {
        type: 'file', name: 'image25thumb.jpg', lastModified: '2020-02-23T21:07:50.000Z', size: 9321, path: '/img/gallery',
      }, {
        type: 'file', name: 'image26.jpg', lastModified: '2020-02-23T21:07:50.000Z', size: 93981, path: '/img/gallery',
      }, {
        type: 'file', name: 'image26thumb.jpg', lastModified: '2020-02-23T21:07:50.000Z', size: 6167, path: '/img/gallery',
      }, {
        type: 'file', name: 'image27.jpg', lastModified: '2020-02-23T21:07:51.000Z', size: 149069, path: '/img/gallery',
      }, {
        type: 'file', name: 'image27thumb.jpg', lastModified: '2020-02-23T21:07:51.000Z', size: 7118, path: '/img/gallery',
      }, {
        type: 'file', name: 'image28.jpg', lastModified: '2020-02-23T21:07:51.000Z', size: 110693, path: '/img/gallery',
      }, {
        type: 'file', name: 'image28thumb.jpg', lastModified: '2020-02-23T21:07:51.000Z', size: 9944, path: '/img/gallery',
      }, {
        type: 'file', name: 'image29.jpg', lastModified: '2020-02-23T21:07:51.000Z', size: 107534, path: '/img/gallery',
      }, {
        type: 'file', name: 'image29thumb.jpg', lastModified: '2020-02-23T21:07:51.000Z', size: 9398, path: '/img/gallery',
      }, {
        type: 'file', name: 'image30.jpg', lastModified: '2020-02-23T21:07:51.000Z', size: 133102, path: '/img/gallery',
      }, {
        type: 'file', name: 'image30thumb.jpg', lastModified: '2020-02-23T21:07:51.000Z', size: 9447, path: '/img/gallery',
      }],
    }, {
      type: 'file', name: 'loading.gif', lastModified: '2020-02-23T21:07:22.000Z', size: 36307, path: '/img',
    }, {
      type: 'file', name: 'package-lock.json', lastModified: '2021-05-07T19:51:02.000Z', size: 84090, path: '/img',
    }, {
      type: 'file', name: 'video-play.png', lastModified: '2020-02-23T21:07:23.000Z', size: 4526, path: '/img',
    }, {
      type: 'file', name: 'vimeo-play.png', lastModified: '2020-02-23T21:07:23.000Z', size: 5428, path: '/img',
    }, {
      type: 'file', name: 'youtube-play.png', lastModified: '2020-02-23T21:07:23.000Z', size: 5177, path: '/img',
    }],
  }, {
    type: 'folder',
    name: 'js',
    path: '/js',
    children: [{
      type: 'file', name: 'emailPop.js', lastModified: '2020-02-23T21:07:58.000Z', size: 250, path: '/js',
    }, {
      type: 'file', name: 'lg-autoplay.js', lastModified: '2020-02-23T21:07:58.000Z', size: 5777, path: '/js',
    }, {
      type: 'file', name: 'lg-fullscreen.js', lastModified: '2020-02-23T21:07:58.000Z', size: 3045, path: '/js',
    }, {
      type: 'file', name: 'lg-hash.js', lastModified: '2020-02-23T21:07:58.000Z', size: 1942, path: '/js',
    }, {
      type: 'file', name: 'lg-pager.js', lastModified: '2020-02-23T21:07:59.000Z', size: 2729, path: '/js',
    }, {
      type: 'file', name: 'lg-thumbnail.js', lastModified: '2020-02-23T21:07:59.000Z', size: 15090, path: '/js',
    }, {
      type: 'file', name: 'lg-video.js', lastModified: '2020-02-23T21:07:59.000Z', size: 11372, path: '/js',
    }, {
      type: 'file', name: 'lg-zoom.js', lastModified: '2020-02-23T21:07:59.000Z', size: 15694, path: '/js',
    }, {
      type: 'file', name: 'lightgallery.js', lastModified: '2020-02-23T21:07:59.000Z', size: 42698, path: '/js',
    }],
  }, {
    type: 'folder',
    name: 'pages',
    path: '/pages',
    children: [{
      type: 'file', name: 'about.html', lastModified: '2020-02-23T21:07:59.000Z', size: 2533, path: '/pages',
    }, {
      type: 'file', name: 'advertisingvideo.html', lastModified: '2020-02-23T21:07:59.000Z', size: 8036, path: '/pages',
    }, {
      type: 'file', name: 'cover.html', lastModified: '2020-02-23T21:07:59.000Z', size: 3939, path: '/pages',
    }, {
      type: 'file', name: 'illustration.html', lastModified: '2020-02-23T21:08:00.000Z', size: 7239, path: '/pages',
    }, {
      type: 'folder',
      name: 'swfPages',
      path: '/pages/swfPages',
      children: [{
        type: 'file', name: 'beatTheReaper.html', lastModified: '2020-02-23T21:08:02.000Z', size: 2933, path: '/pages/swfPages',
      }, {
        type: 'file', name: 'cheatingDeath.html', lastModified: '2020-02-23T21:08:03.000Z', size: 2664, path: '/pages/swfPages',
      }, {
        type: 'file', name: 'connected.html', lastModified: '2020-02-23T21:08:03.000Z', size: 2637, path: '/pages/swfPages',
      }, {
        type: 'file', name: 'davidGoliath.html', lastModified: '2020-02-23T21:08:02.000Z', size: 2659, path: '/pages/swfPages',
      }, {
        type: 'file', name: 'ladyGaga.html', lastModified: '2020-02-23T21:08:03.000Z', size: 2647, path: '/pages/swfPages',
      }, {
        type: 'file', name: 'loveLost.html', lastModified: '2020-02-23T21:08:03.000Z', size: 2973, path: '/pages/swfPages',
      }, {
        type: 'file', name: 'ourDumbWorld.html', lastModified: '2020-02-23T21:08:03.000Z', size: 2940, path: '/pages/swfPages',
      }, {
        type: 'file', name: 'quietRoom.html', lastModified: '2020-02-23T21:08:03.000Z', size: 2932, path: '/pages/swfPages',
      }, {
        type: 'file', name: 'sugarFrosted.html', lastModified: '2020-02-23T21:08:03.000Z', size: 2651, path: '/pages/swfPages',
      }, {
        type: 'file', name: 'theyEatPuppies.html', lastModified: '2020-02-23T21:08:03.000Z', size: 2968, path: '/pages/swfPages',
      }],
    }],
  }, {
    type: 'folder',
    name: 'sass',
    path: '/sass',
    children: [{
      type: 'file', name: 'lg-animations.scss', lastModified: '2020-02-23T21:08:00.000Z', size: 19379, path: '/sass',
    }, {
      type: 'file', name: 'lg-autoplay.scss', lastModified: '2020-02-23T21:08:00.000Z', size: 685, path: '/sass',
    }, {
      type: 'file', name: 'lg-fb-comment-box.scss', lastModified: '2020-02-23T21:08:00.000Z', size: 1131, path: '/sass',
    }, {
      type: 'file', name: 'lg-fonts.scss', lastModified: '2020-02-23T21:08:00.000Z', size: 713, path: '/sass',
    }, {
      type: 'file', name: 'lg-fullscreen.scss', lastModified: '2020-02-23T21:08:00.000Z', size: 135, path: '/sass',
    }, {
      type: 'file', name: 'lg-mixins.scss', lastModified: '2020-02-23T21:08:01.000Z', size: 8369, path: '/sass',
    }, {
      type: 'file', name: 'lg-pager.scss', lastModified: '2020-02-23T21:08:01.000Z', size: 2035, path: '/sass',
    }, {
      type: 'file', name: 'lg-theme-default.scss', lastModified: '2020-02-23T21:08:01.000Z', size: 3848, path: '/sass',
    }, {
      type: 'file', name: 'lg-thumbnail.scss', lastModified: '2020-02-23T21:08:01.000Z', size: 2387, path: '/sass',
    }, {
      type: 'file', name: 'lg-transitions.scss', lastModified: '2020-02-23T21:08:01.000Z', size: 20836, path: '/sass',
    }, {
      type: 'file', name: 'lg-variables.scss', lastModified: '2020-02-23T21:08:01.000Z', size: 1650, path: '/sass',
    }, {
      type: 'file', name: 'lg-video.scss', lastModified: '2020-02-23T21:08:02.000Z', size: 2404, path: '/sass',
    }, {
      type: 'file', name: 'lg-zoom.scss', lastModified: '2020-02-23T21:08:01.000Z', size: 1269, path: '/sass',
    }, {
      type: 'file', name: 'lightgallery.scss', lastModified: '2020-02-23T21:08:02.000Z', size: 6356, path: '/sass',
    }, {
      type: 'file', name: 'prepros.cfg', lastModified: '2020-02-23T21:08:02.000Z', size: 15786, path: '/sass',
    }],
  }, {
    type: 'file', name: 'index.html', lastModified: '2020-02-23T21:12:29.000Z', size: 3281,
  }, {
    type: 'file', name: 'package-lock.json', lastModified: '2021-05-07T19:28:18.000Z', size: 84090,
  }, {
    type: 'file', name: 'README.md', lastModified: '2021-08-12T19:23:15.000Z', size: 1931,
  }, {
    type: 'file', name: 'realbook1C-reg.pdf', lastModified: '2021-05-07T02:23:33.000Z', size: 46199720,
  }, {
    type: 'file', name: 'sitemap.xml', lastModified: '2020-02-23T21:07:21.000Z', size: 767,
  }],
}, { Name: 'misterpea.me-emails', Region: 'us-east-1', CreationDate: '2021-01-25T03:06:10.000Z' }, { Name: 'new-ass-bucket', Region: 'us-east-1', CreationDate: '2021-04-15T13:48:06.000Z' }, { Name: 'topstories.misterpea.me', Region: 'us-east-2', CreationDate: '2020-04-09T22:56:59.000Z' }, { Name: 'www.misterpea.me', Region: 'us-east-2', CreationDate: '2020-02-23T19:59:01.000Z' }];

jest.mock('../src/components/helpers/useParseQuery', () => () => ({ id: 'misterpea.me', loc: 'us-east-2' }));

describe('File Display Component', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  useSelectorMock.mockReturnValue({ buckets });
  const spyUseDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const useDispatchMock = jest.fn();
  spyUseDispatchMock.mockReturnValue(useDispatchMock);

  it('Renders without crashing', () => {
    const div = document.createElement('DIV');
    ReactDOM.render(<FileDisplay />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders the content of the search query', () => {
    const wrapper = shallow(<FileDisplay />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
