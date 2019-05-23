import React, { createElement } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import styles from './index.module.less';
import {getRootUrl} from 'utils/helper'
const Exception = ({ className, linkElement = 'a', type, desc, img, actions}) => {
  const pageType = type || '404';
  const clsString = classNames(styles.exception, className);
  return (
    <div className={clsString} >
      <div className={styles.imgBlock}>
        <div
          className={styles.imgEle}
          style={{ backgroundImage: `url(${img})` }}
        />
      </div>
      <div className={styles.content}>
        <h1>{pageType || '404'}</h1>
        <div className={styles.desc}>{desc}</div>
        <div className={styles.actions}>
          {actions ||
            createElement(
              linkElement,
              {
                to: '/',
                href: getRootUrl(),
              },
              <Button type="primary">返回首页</Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Exception;
