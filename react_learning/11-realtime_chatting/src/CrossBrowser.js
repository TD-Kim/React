//os 감지
import getAgent from '@egjs/agent';

const agent = getAgent();

function CrossBrowser() {
  console.log(agent.os.name);
  const IS_ANDROID = agent.os.name === 'android';
  const IS_IOS = agent.os.name === 'ios';
  if (IS_ANDROID) {
    console.log(1);
    window.location.href =
      'intent:park-siwan.github.io/react-firebase-chatting#Intent;scheme=http;package=com.android.chrome;end';
  } else if (IS_IOS) {
    // window.open(
    //   'https://park-siwan.github.io/react-firebase-chatting',
    //   '_self'
    // );
  }
}

export default CrossBrowser;
