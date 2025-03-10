import React from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { UPDATE_ORGANIZATION_MUTATION } from 'GraphQl/Mutations/mutations';
import styles from './OrgUpdate.module.css';

interface OrgUpdateProps {
  id: string;
  orgid: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OrgUpdate(props: OrgUpdateProps): JSX.Element {
  const [formState, setFormState] = React.useState({
    orgName: '',
    orgDescrip: '',
    creator: '',
    apiUrl: '',
    applangcode: '',
    selectedOption: '',
  });
  const [publicchecked, setPublicChecked] = React.useState(true);
  const [visiblechecked, setVisibleChecked] = React.useState(false);

  const { t } = useTranslation('translation', {
    keyPrefix: 'orgUpdate',
  });

  const [login] = useMutation(UPDATE_ORGANIZATION_MUTATION);

  const login_link = async () => {
    try {
      const { data } = await login({
        variables: {
          name: formState.orgName,
          description: formState.orgDescrip,
          isPublic: publicchecked,
          visibleInSearch: visiblechecked,
        },
      });
      /* istanbul ignore next */
      if (data) {
        window.alert('Successful updated');
        window.location.reload();
      }
    } catch (error) {
      /* istanbul ignore next */
      window.alert(error);
    }
  };

  /* istanbul ignore next */
  const cancelUpdate = () => {
    window.location.reload();
  };

  return (
    <>
      <div id="orgupdate" className={styles.userupdatediv}>
        <form>
          {/* <h3 className={styles.settingstitle}>Update Your Details</h3> */}
          <div className={styles.dispflex}>
            <div>
              <label>{t('name')}</label>
              <input
                type="input"
                id="orgname"
                placeholder={t('enterNameOrganization')}
                autoComplete="off"
                required
                value={formState.orgName}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    orgName: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label>{t('description')}</label>
              <input
                type="input"
                id="orgdescrip"
                placeholder={t('description')}
                autoComplete="off"
                required
                value={formState.orgDescrip}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    orgDescrip: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className={styles.dispflex}>
            <div>
              <label>{t('creator')}</label>
              <input
                type="creator"
                id="creator"
                placeholder={t('creator')}
                autoComplete="off"
                required
                value={formState.creator}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    creator: e.target.value,
                  });
                }}
              />
            </div>
            <div>
              <label>{t('apiUrl')}</label>
              <input
                type="apiUrl"
                id="apiUrl"
                placeholder={t('apiUrl')}
                required
                value={formState.apiUrl}
                onChange={(e) => {
                  setFormState({
                    ...formState,
                    apiUrl: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className={styles.dispflex}>
            <div>
              <label htmlFor="orgphoto" className={styles.orgphoto}>
                {t('displayImage')}:
                <input
                  accept="image/*"
                  id="orgphoto"
                  name="photo"
                  type="file"
                  multiple={false}
                  //onChange=""
                />
              </label>
            </div>
            <div className={styles.checkboxdiv}>
              <div>
                <label htmlFor="ispublic">{t('isPublic')}:</label>
                <input
                  id="ispublic"
                  type="checkbox"
                  defaultChecked={publicchecked}
                  onChange={() => setPublicChecked(!publicchecked)}
                />
              </div>
              <div>
                <label htmlFor="registrable">{t('isRegistrable')}:</label>
                <input
                  id="registrable"
                  type="checkbox"
                  defaultChecked={visiblechecked}
                  onChange={() => setVisibleChecked(!visiblechecked)}
                />
              </div>
            </div>
          </div>
          <div className={styles.dispbtnflex}>
            <button
              type="button"
              className={styles.greenregbtn}
              value="savechanges"
              onClick={login_link}
            >
              {t('saveChanges')}
            </button>
            <button
              type="button"
              className={styles.whitebtn}
              value="cancelchanges"
              onClick={cancelUpdate}
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default OrgUpdate;
