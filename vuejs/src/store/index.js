import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
  state: {


    user: {
      token: sessionStorage.getItem("TOKEN"),
      data: {},
    },
    //seat start
    seats: {
      loading: false,
      data: [],
      links: [],
      from: null,
      to: null,
      page: 1,
      limit: null,
      total: null,
    },
    currentSeat: {
      data: {},
      loading: false,
    },

//seat end
   //passengers start
   passengers: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null,
  },
  currentPassenger: {
    data: {},
    loading: false,
  },

//passengers end
//bus start
    buses: {
      loading: false,
      data: [],
      links: [],
      from: null,
      to: null,
      page: 1,
      limit: null,
      total: null,
    },
    currentBus: {
      data: {},
      loading: false,
    },

//bus end
//bus start
    reservations: {
      loading: false,
      data: [],
      links: [],
      from: null,
      to: null,
      page: 1,
      limit: null,
      total: null,
    },
    currentReservation: {
      data: {},
      loading: false,
    },

//bus end

//city start
cities: {
  loading: false,
  data: [],
  links: [],
  from: null,
  to: null,
  page: 1,
  limit: null,
  total: null,
},
currentCity: {
  data: {},
  loading: false,
},

//city end
//routes start
routes: {
  loading: false,
  data: [],
  links: [],
  from: null,
  to: null,
  page: 1,
  limit: null,
  total: null,
},
currentRoute: {
  data: {},
  loading: false,
},

//routes end
    users: {
      data: [],
      loading: false,
      links: [],
      from: null,
      to: null,
      page: 1,
      limit: null,
      total: null,
    },


    dashboard: {
      loading: false,
      data: {},
    },


    logos: {
      loading: false,
      data: [],
    },

    error: {
      show: false,
      type: "error",
      message: "",
    },
    notification: {
      show: false,
      type: "success",
      message: "",
    },

  },
  getters: {



  },
  actions: {
     // buses start
     addBus({ commit, dispatch }, bus, errors) {
      let response;
      if (bus.id) {
        response = axiosClient
          .put(`/bus/${bus.id}`, bus)
          .then((res) => {
            commit("setCurrentBus", res.data);
            return res;
          });
      } else {
        response = axiosClient.post("/bus", bus).then((res) => {
          commit("setCurrentBus", res.data);
          return res;
        });
      }

      return response;
    },

    showBus({ commit }, { id: id }) {
      commit("setCurrentBusLoading", true);

      return axiosClient
        .get(`/bus/${id}`)
        .then((res) => {
          commit("setCurrentBus", res.data);
          commit("setCurrentBusLoading", false);
        })
        .catch((error) => {
          commit("setCurrentBusLoading", false);

          console.log(error);
        });
    },

    getBuses(
      { commit, state },
      {
        url = null,
        search = "",
        per_page,
        sort_field,
        sort_direction,
        filed,
        direction,
      } = {}
    ) {
      commit("setBuses", [true]);
      url = url || "/bus";
      const params = {
        per_page: state.buses.limit,
      };
      return axiosClient
        .get(url, {
          params: {
            ...params,
            search,
            per_page,
            sort_field,
            sort_direction,
            filed,
            direction,
          },
        })
        .then((response) => {
          commit("setBuses", [false, response.data]);
        })
        .catch(() => {
          commit("setBuses", [false]);
        });
    },
    //bus end
 // seats start
 addSeat({ commit, dispatch }, seat, errors) {
  let response;
  if (seat.id) {
    response = axiosClient
      .put(`/assign-seat'/${seat.id}`, seat)
      .then((res) => {
        commit("setCurrentSeat", res.data);
        return res;
      });
  } else {
    response = axiosClient.post("/assign-seat", seat).then((res) => {
      commit("setCurrentSeat", res.data);
      return res;
    });
  }

  return response;
},

showSeat({ commit }, { id: id }) {
  commit("setCurrentSeatLoading", true);

  return axiosClient
    .get(`/assign-seat/${id}`)
    .then((res) => {
      commit("setCurrentSeat", res.data);
      commit("setCurrentSeatLoading", false);
    })
    .catch((error) => {
      commit("setCurrentSeatLoading", false);

      console.log(error);
    });
},

getSeats(
  { commit, state },
  {
    url = null,
    search = "",
    keyword = "",
    route = "",

    per_page,
    sort_field,
    sort_direction,
    filed,
    direction,
  } = {}
) {
  commit("setSeats", [true]);
  url = url || "/assign-seat";
  const params = {
    per_page: state.seats.limit,
  };
  return axiosClient
    .get(url, {
      params: {
        ...params,
        search,
        route,
        keyword,
        per_page,
        sort_field,
        sort_direction,
        filed,
        direction,
      },
    })
    .then((response) => {
      commit("setSeats", [false, response.data]);
    })
    .catch(() => {
      commit("setSeats", [false]);
    });
},
//seats end
// passengers start

showPassenger({ commit }, { id: id }) {
  commit("setCurrentSeatLoading", true);

  return axiosClient
    .get(`/assign-seat/${id}`)
    .then((res) => {
      commit("setCurrentSeat", res.data);
      commit("setCurrentSeatLoading", false);
    })
    .catch((error) => {
      commit("setCurrentSeatLoading", false);

      console.log(error);
    });
},

getPassengers(
  { commit, state },
  {
    url = null,
    search = "",
    keyword = "",
    id = "",

    per_page,
    sort_field,
    sort_direction,
    filed,
    direction,
  } = {}
) {
  commit("setPassengers", [true]);
  url = url || "/passengers";
  const params = {
    per_page: state.passengers.limit,
  };
  return axiosClient
    .get(url, {
      params: {
        ...params,
        search,
        id,

        keyword,
        per_page,
        sort_field,
        sort_direction,
        filed,
        direction,
      },
    })
    .then((response) => {
      commit("setPassengers", [false, response.data]);
    })
    .catch(() => {
      commit("setPassengers", [false]);
    });
},
//passengers end
 // reservation start
     addBus({ commit, dispatch }, bus, errors) {
      let response;
      if (bus.id) {
        response = axiosClient
          .put(`/bus/${bus.id}`, bus)
          .then((res) => {
            commit("setCurrentBus", res.data);
            return res;
          });
      } else {
        response = axiosClient.post("/bus", bus).then((res) => {
          commit("setCurrentBus", res.data);
          return res;
        });
      }

      return response;
    },

    showBus({ commit }, { id: id }) {
      commit("setCurrentBusLoading", true);

      return axiosClient
        .get(`/bus/${id}`)
        .then((res) => {
          commit("setCurrentBus", res.data);
          commit("setCurrentBusLoading", false);
        })
        .catch((error) => {
          commit("setCurrentBusLoading", false);

          console.log(error);
        });
    },

    getReservations(
      { commit, state },
      {
        url = null,
        search = "",
        per_page,
        sort_field,
        sort_direction,
        filed,
        direction,
      } = {}
    ) {
      commit("setReservations", [true]);
      url = url || "/reservations";
      const params = {
        per_page: state.reservations.limit,
      };
      return axiosClient
        .get(url, {
          params: {
            ...params,
            search,
            per_page,
            sort_field,
            sort_direction,
            filed,
            direction,
          },
        })
        .then((response) => {
          commit("setReservations", [false, response.data]);
        })
        .catch(() => {
          commit("setReservations", [false]);
        });
    },
    //bus end
      // city start
      addCity({ commit, dispatch }, city, errors) {
        let response;
        if (city.id) {
          response = axiosClient
            .put(`/city/${city.id}`, city)
            .then((res) => {
              commit("setCurrentCity", res.data);
              return res;
            });
        } else {
          response = axiosClient.post("/city", city).then((res) => {
            commit("setCurrentCity", res.data);
            return res;
          });
        }

        return response;
      },

      showCity({ commit }, { id: id }) {
        commit("setCurrentCityLoading", true);

        return axiosClient
          .get(`/city/${id}`)
          .then((res) => {
            commit("setCurrentCity", res.data);
            commit("setCurrentCityLoading", false);
          })
          .catch((error) => {
            commit("setCurrentCityLoading", false);

            console.log(error);
          });
      },

      getCities(
        { commit, state },
        {
          url = null,
          search = "",
          per_page,
          sort_field,
          sort_direction,
          filed,
          direction,
        } = {}
      ) {
        commit("setCities", [true]);
        url = url || "/city";
        const params = {
          per_page: state.cities.limit,
        };
        return axiosClient
          .get(url, {
            params: {
              ...params,
              search,
              per_page,
              sort_field,
              sort_direction,
              filed,
              direction,
            },
          })
          .then((response) => {
            commit("setCities", [false, response.data]);
          })
          .catch(() => {
            commit("setCities", [false]);
          });
      },
      deleteAllCity({}, checked) {
        return axiosClient
          .post("/city/delete-all-city", { data: checked })
          .then((response) => {});
      },
      //city end

  // buses start
  addRoute({ commit, dispatch }, route, errors) {
    let response;
    if (route.id) {
      response = axiosClient
        .put(`/routes/${route.id}`, route)
        .then((res) => {
          commit("setCurrentRoute", res.data);
          return res;
        });
    } else {
      response = axiosClient.post("/routes", route).then((res) => {
        commit("setCurrentRoute", res.data);
        return res;
      });
    }

    return response;
  },

  showRoute({ commit }, { id: id }) {
    commit("setCurrentRouteLoading", true);

    return axiosClient
      .get(`/routes/${id}`)
      .then((res) => {
        commit("setCurrentRoute", res.data);
        commit("setCurrentRouteLoading", false);
      })
      .catch((error) => {
        commit("setCurrentRouteLoading", false);

        console.log(error);
      });
  },

  getRoutes(
    { commit, state },
    {
      url = null,
      search = "",
      per_page,
      sort_field,
      sort_direction,
      filed,
      direction,
    } = {}
  ) {
    commit("setRoutes", [true]);
    url = url || "/routes";
    const params = {
      per_page: state.routes.limit,
    };
    return axiosClient
      .get(url, {
        params: {
          ...params,
          search,
          per_page,
          sort_field,
          sort_direction,
          filed,
          direction,
        },
      })
      .then((response) => {
        commit("setRoutes", [false, response.data]);
      })
      .catch(() => {
        commit("setRoutes", [false]);
      });
  },

  deleteAllRoute({}, checked) {
    return axiosClient
      .post("/route/delete-all-route", { data: checked })
      .then((response) => {});
  },
  //routes end

    createUser({ commit }, user) {
      delete user.image_url;

      let response;
      if (user.id) {
        response = axiosClient
          .put(`/user-managment/${user.id}`, user)
          .then((res) => {
            commit("setCurrentUser", res.data);
            return res;
          });
      } else {
        response = axiosClient.post("/user-managment", user).then((res) => {
          commit("setCurrentUser", res.data);
          return res;
        });
      }

      return response;
    },


    getCurrentUser({ commit }, data) {
      return axiosClient.get("/user", data).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    updateProfile({ commit }, userData) {
      delete userData.image_url;
      let response;
      const token = store.state.user.token; // get the token from state
      response = axiosClient
        .put("/update-data", {
          name: userData.name,
          email: userData.email,
          image: userData.image,
          phone: userData.phone,
          company: userData.company,
          address: userData.address,
          secret: userData.secret,
          UserSecret: userData.UserSecret,
          Tin: userData.Tin,
          Vat: userData.Vat,
        })
        .then((res) => {
          if (res) {
            store.commit("notify", {
              type: "success",
              message: res.data.success,
            });
          }
          store.dispatch("getUser");

          commit("setUser", res.data);

          return res;
        });
      store.dispatch("getUser");

      return response;
    },

    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },


    saveLogo({ commit, dispatch }, logo) {
      delete logo.image_url;

      let response;
      if (logo.id) {
        response = axiosClient.put(`/logo/${logo.id}`, logo).then((res) => {
          commit("setCurrentLogo", res.data);
          return res;
        });
      } else {
        response = axiosClient.post("/logo", logo).then((res) => {
          commit("setCurrentLogo", res.data);
          return res;
        });
      }

      return response;
    },

    getLogo({ commit }, id) {
      commit("setCurrentLogoLoading", true);
      return axiosClient
        .get(`/logo/${id}`)
        .then((res) => {
          commit("setCurrentLogo", res.data);
          commit("setCurrentLogoLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentLogoLoading", false);
          throw err;
        });
    },



    getLogos({ commit }, { url = null } = {}) {
      commit("setLogosLoading", true);
      url = url || "/logo";
      return axiosClient.get(url).then((res) => {
        commit("setLogosLoading", false);
        commit("setLogos", res.data);
        return res;
      });
    },

    getUsers(
      { commit, state },
      {
        url = null,
        search = "",
        per_page,
        sort_field,
        sort_direction,
        filed,
        direction,
      } = {}
    ) {
      commit("setUsers", [true]);
      url = url || "/user-managment";
      const params = {
        per_page: state.users.limit,
      };
      return axiosClient
        .get(url, {
          params: {
            ...params,
            search,
            per_page,
            sort_field,
            sort_direction,
            filed,
            direction,
          },
        })
        .then((response) => {
          commit("setUsers", [false, response.data]);
        })
        .catch(() => {
          commit("setUsers", [false]);
        });
    },


    deleteUser({}, id) {
      return axiosClient.delete(`/users/${id}`);
    },

    deleteLogo({}, id) {
      return axiosClient.delete(`/logo/${id}`);
    },


    deleteAllBus({}, checked) {
      return axiosClient
        .post("/bus/delete-all-bus", { data: checked })
        .then((response) => {});
    },

    deleteLogoAll({}, checked) {
      return axiosClient
        .post("/logo/deleteall/", { data: checked })
        .then((response) => {});
    },
    deleteLogo({}, id) {
      return axiosClient.delete(`/logo/${id}`);
    },

    deleteAllUser({}, checked) {
      return axiosClient.post(`/users/deleteAllUser`, { data: checked });
    },
    getUser({ commit }) {
      return axiosClient.get("/user").then((res) => {
        //console.log(res);
        commit("setUser", res.data);
      });
    },

  },
  mutations: {

    dashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data;
    },




    setCurrentLogoLoading: (state, loading) => {
      state.logos.loading = loading;
    },
    setCurrentLogo: (state, logos) => {
      state.logos.data = logos.data;
    },
    setLogosLoading: (state, loading) => {
      state.logos.loading = loading;
    },
    setLogos: (state, logos) => {
      state.logos.data = logos.data;
    },


    setUsersLoading: (state, loading) => {
      state.currentUser.loading = loading;
    },
    setUsers: (state, currentUser) => {
      state.currentUser.data = currentUser.data;
    },


    setUsers(state, [loading, data = null]) {
      if (data) {
        state.users = {
          ...state.users,
          data: data.data,
          links: data.meta?.links,
          page: data.meta.current_page,
          limit: data.meta.per_page,
          from: data.meta.from,
          to: data.meta.to,
          total: data.meta.total,
        };
      }
      state.users.loading = loading;
    },



    setUser(state, user) {
      state.user.data = user;
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem("TOKEN", token);
    },
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },

//bus start

    setCurrentBus: (state, bus) => {
      state.currentBus.data = bus.data;
    },
    setBusLoading: (state, loading) => {
      state.buses.loading = loading;
    },
    setBuses(state, [loading, data = null]) {
      if (data) {
        state.buses = {
          ...state.buses,
          data: data.data,
          links: data.meta?.links,
          page: data.meta.current_page,
          limit: data.meta.per_page,
          from: data.meta.from,
          to: data.meta.to,
          total: data.meta.total,
        };
      }
      state.buses.loading = loading;
    },


//bus end

//city start

setCurrentCity: (state, city) => {
  state.currentCity.data = city.data;
},
setBusLoading: (state, loading) => {
  state.cities.loading = loading;
},
setCities(state, [loading, data = null]) {
  if (data) {
    state.cities = {
      ...state.cities,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    };
  }
  state.cities.loading = loading;
},


//city end


//reservations start

setCurrentRoute: (state, reservations) => {
  state.currentReservation.data = reservations.data;
},
setRouteLoading: (state, loading) => {
  state.reservations.loading = loading;
},
setReservations(state, [loading, data = null]) {
  if (data) {
    state.reservations = {
      ...state.reservations,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    };
  }
  state.reservations.loading = loading;
},


//reservations end

//routes start

setCurrentRoute: (state, routes) => {
  state.currentRoute.data = routes.data;
},
setRouteLoading: (state, loading) => {
  state.routes.loading = loading;
},
setRoutes(state, [loading, data = null]) {
  if (data) {
    state.routes = {
      ...state.routes,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    };
  }
  state.routes.loading = loading;
},


//routes end

//passengers start

setCurrentPassenger: (state, passengers) => {
  state.currentPassenger.data = passengers.data;
},
setPassengerLoading: (state, loading) => {
  state.passengers.loading = loading;
},
setPassengers(state, [loading, data = null]) {
  if (data) {
    state.passengers = {
      ...state.passengers,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    };
  }
  state.passengers.loading = loading;
},
//passengers end

//seats start

setCurrentSeat: (state, seats) => {
  state.currentSeat.data = seats.data;
},
setSeatLoading: (state, loading) => {
  state.seats.loading = loading;
},
setSeats(state, [loading, data = null]) {
  if (data) {
    state.seats = {
      ...state.seats,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    };
  }
  state.seats.loading = loading;
},
//seats end

    notify: (state, { message, type }) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 6000);
    },
  },
  notify_error: (state, { message, type }) => {
    state.error.show = true;
    state.error.type = type;
    state.error.message = message;
    setTimeout(() => {
      state.error.show = false;
    }, 5000);
  },
  modules: {},
});

export default store;
