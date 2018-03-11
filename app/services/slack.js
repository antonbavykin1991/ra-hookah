import { assert } from '@ember/debug'
import Service from '@ember/service';

import $ from 'jquery'
import config from 'ra/config/environment'

export default Service.extend({
  webhook ({username, text}) {
    const {
      slack: {
        url,
        channel
      } = {}
    } = config

    assert('you should pass slack { url } to your config/environment.js', url)
    assert('you should pass slack { channel } to your config/environment.js', channel)

    return $.post(url, {
      payload: JSON.stringify({
        channel,
        username,
        text
      })
    })
  }
});
