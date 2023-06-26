import { Constants } from "../constants/Constants";

const { BASE_URL } = Constants;
const axios = require("axios");

export function AccountService() {
  /**
   * Get the clients associated with the current user's account.
   *
   */
  const vm = this;

  const apiHeaders = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  vm.getOrganisations = async function () {
    return axios.get(`${BASE_URL}Organisations`, apiHeaders);
  };
  vm.postOrganisation = async function (org) {
    return axios.post(
      `${BASE_URL}Organisations?organisation=${org}`,
      apiHeaders
    );
  };
}

export default { AccountService };
