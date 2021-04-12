import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';

const db = firestore()

export default {
    checkLogin: async () => {
        let result = auth().currentUser;
        return result;
    },

    setTokenMessage: async (idDono) => {
        await messaging().registerDeviceForRemoteMessages()
        const token = await messaging().getToken()
        await db.collection('dono').doc(idDono).update({
            token: token,
        });
    },

    SignIn: async (email, password) => {
        return await auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                return user.user.uid;
            })
            .catch(error => {
                return error;
            });
    },

    SignUp: async (name, email, password, telefone1, telefone2) => {
        return await auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                db.collection('dono')
                .doc(user.user.uid)
                .set({
                    idDono: user.user.uid,
                    name: name,
                    email: email,
                    senha: password,
                    celular1: telefone1,
                    celular2: telefone2,
                    avatar: '',
                })
                return user.user.uid;
            })
            .catch((error) => {
                return error;
            });
    },

    SignUp2: async (idDono, dataNasc, cnpj, cep, rua, bairro, numero, cidade, estado) => {
        await db.collection('dono')
            .doc(idDono)
            .update({
                dataNascimento: dataNasc,
                cnpj: cnpj,
                endereco: {
                    cep: cep,
                    rua: rua,
                    bairro: bairro,
                    numero: numero,
                    cidade: cidade,
                    estado: estado,
                },
            })
            .catch((error) => {
                return error;
            })
        return true;
    },

    logout: async () => {
        await auth().signOut();
    },

    createSportCourts: async (idDono, nameQuadra, telefone, cep, rua, numero, bairro, cidade, estado) => {
        let quadra = await db.collection('quadras').add({
            avatar: '',
            name: nameQuadra,
            telefone: telefone,
            idDono: idDono,
            stars: '0',
            numAvaliacao: 0,
            endereco: {
                cep: cep,
                rua: rua,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
            },
            agendamento: [],
        });
        await db.collection('quadras').doc(quadra.id).update({
            idQuadra: quadra.id,
        });

        await db.collection('dono').doc(idDono).update({
            quadras: quadra.id,
        });

        return quadra;
    },

    setService: async (idQuadra, tipo, preco) => {
        let result = await db.collection('quadras').doc(idQuadra).get();
        let typeReg = result.data().servico;
        if (typeReg) 
        {
            for (let i = 0; i < typeReg.length; i++) 
            {
                if (tipo == typeReg[i].tipo) 
                {
                    return false;
                }
            }
        }
        await db
            .collection('quadras')
            .doc(idQuadra)
            .update({
                servico: firestore.FieldValue.arrayUnion({
                    tipo: tipo,
                    preco: preco,
                }),
            });
        return true;
    },

    setPeriod: async (idQuadra, selectedDay, selectedMonth, selectedYear, selectedHour) => {
        month = selectedMonth < 10 ? '0' + (selectedMonth + 1) : selectedMonth + 1;
        day = selectedDay < 10 ? '0' + selectedDay : selectedDay;
        date = `${day}/${month}/${selectedYear}`;
        var i;
        var horas = [];
        for (i = 0; i < selectedHour.length; i++)
        {
            horas.push({
                hora: selectedHour[i],
                disponivel: true,
            });
        }
        let postTransaction = await db.collection('quadras')
            .doc(idQuadra)
            .collection('periodo')
            .add({
                data: date,
                horas,
            });
        return postTransaction;
    },

    onPeriod: (idQuadra, setListPeriod) => {
        return db
            .collection('quadras')
            .doc(idQuadra)
            .collection('periodo')
            .onSnapshot((doc) => {
                if (doc.docs) 
                {
                    let docPeriod = doc.docs.map((period) => period.data())
                    setListPeriod(docPeriod);
                }
            });
    },

    onPeriodUpdate: (idQuadra, setListPeriod) => {
        return db
            .collection('quadras')
            .doc(idQuadra)
            .collection('periodo')
            .onSnapshot((doc) => {
                if (doc.docs) 
                {
                    let docPeriod = doc.docs.map((period) => period.data())
                    setListPeriod(docPeriod)
                }
            });
    },

    LoadUserAdmin: async (idDono) => {
        let result = await db.collection('dono').doc(idDono).get();
        return result;
    },

    LoadSportCourt: async (idQuadra) => {
        let result = await db.collection('quadras').doc(idQuadra).get();
        return result;
    },

    getAppointments: async (idQuadra) => {
        let list = [];
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        let selDate = `${day}/${month}/${year}`;

        let result = await db.collection('quadras').doc(idQuadra).get();
        if (result.exists) 
        {
            var listAppointments = result.data().agendamento;
        }

        await db.collection('agendamento')
            .orderBy('hora', 'asc')
            .get()
            .then((snapshot) => {
                snapshot.docs.map((doc) => {
                    if (doc.exists) 
                    {
                        let data = doc.data()
                        for (i in listAppointments) 
                        {
                            if (doc.id == listAppointments[i] &&data.data == selDate)
                            {
                                list.push({
                                    data: data.data,
                                    hora: data.hora,
                                    idAgendamento: listAppointments[i],
                                    idJogador: data.idJogador,
                                    jogadorNome: data.jogadorNome,
                                    servico: data.servico,
                                    idPeriodo: data.idPeriodo,
                                    jogadorToken: data.jogadorToken,
                                });
                            }
                        }
                    }
                })
            });

        return list;
    },

    cancelAppointments: async (idQuadra, infoAgendamento) => {
        var infoQuadra = await db.collection('quadras').doc(idQuadra).get();

        var agendamentoRef = db.collection('agendamento').doc(infoAgendamento.idAgendamento);
        var jogadorRef = db.collection('jogador').doc(infoAgendamento.idJogador);
        var quadraRef = db.collection('quadras').doc(idQuadra);
        var periodoRef = db.collection('quadras')
            .doc(idQuadra)
            .collection('periodo')
            .doc(infoAgendamento.idPeriodo);
        var cancelamentoRef = db.collection('cancelamento').doc();
        var notificacaoRef = db.collection('notificacoes').doc();

        return db.runTransaction(async (transaction) => {
            const postSnapshot = await transaction.get(cancelamentoRef)
            if (cancelamentoRef.exists) 
            {
                return postSnapshot
            }
            transaction.set(cancelamentoRef, {
                idQuadra: idQuadra,
                idJogador: infoAgendamento.idJogador,
                quadraNome: infoQuadra.data().name,
                jogadorNome: infoAgendamento.jogadorNome,
                servico: {
                    tipo: infoAgendamento.servico.tipo,
                    preco: infoAgendamento.servico.preco,
                },
                data: infoAgendamento.data,
                hora: infoAgendamento.hora,
                idPeriodo: infoAgendamento.idPeriodo,
                autor: infoQuadra.data().name,
            });

            transaction.set(notificacaoRef, {
                titulo: infoQuadra.data().name,
                body: `O agendamento do dia ${infoAgendamento.data} às ${infoAgendamento.hora} foi cancelado!`,
                token: infoAgendamento.jogadorToken,
                idJogador: infoAgendamento.idJogador,
                horaNotificacao: new Date(),
            });

            transaction.update(agendamentoRef, {
                agendamento: firestore.FieldValue.arrayRemove(
                    agendamentoRef.id
                ),
            });

            transaction.update(quadraRef, {
                agendamento: firestore.FieldValue.arrayRemove(
                    agendamentoRef.id
                ),
            });

            transaction.update(jogadorRef, {
                agendamento: firestore.FieldValue.arrayRemove(
                    agendamentoRef.id
                ),
            });

            transaction.update(periodoRef, {
                horas: firestore.FieldValue.arrayRemove({
                    hora: infoAgendamento.hora,
                    disponivel: false,
                }),
            });
        });
    },

    verifyPassword: async (donoId, enteredPassword) => {
        const result = await db.collection('dono').doc(donoId).get()
        const password = result.data().senha;
        if (password !== enteredPassword) 
        {
            return false;
        }
        return true;
    },

    updatePassword: async (donoId, newPassword, currentPassword) => {
        let user = auth().currentUser;
        let cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
        await user.reauthenticateWithCredential(cred).then(() => {
            user.updatePassword(newPassword).then(() => {
                return true;
            })
            .catch(error => {
                return error;
            })
        })
        .catch(error => {
            if(error.code === "auth/wrong-password")
            { 
                return false;
            }
        });

        await db.collection('dono').doc(donoId).update({
            senha: newPassword
        });
        
        return true;
    },

    uploadImageAdm: async (donoId, image) => {
        const uploadUri = image;

        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const storageRef = storage().ref(`avatarDono/${donoId}/${filename}`);

        const task = storageRef.putFile(uploadUri);

        task.on('state_changed', (taskSnapshot) => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        if ((await task).state === 'success') 
        {
            var url = await storageRef.getDownloadURL();
        } 
        else 
        {
            console.log('Ocorreu um erro');
        }
        return url;
    },

    updateAvatarAdm: async (donoId, novoAvatar) => {
        await db.collection('dono').doc(donoId).update({
            avatar: novoAvatar,
        });
        return true;
    },

    uploadImageCourt: async (quadraId, image) => {
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const storageRef = storage().ref(`avatarQuadra/${quadraId}/${filename}`);

        const task = storageRef.putFile(uploadUri);

        task.on('state_changed', (taskSnapshot) => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        if ((await task).state === 'success') 
        {
            var url = await storageRef.getDownloadURL();
        } 
        else
        {
            console.log('Ocorreu um erro');
        }
        return url;
    },

    updateAvatarCourt: async (quadraId, novoAvatar) => {
        await db.collection('quadras').doc(quadraId).update({
            avatar: novoAvatar,
        });
        return true;
    },

    uploadPhotosCourt: async (quadraId, foto) => {
        const uploadUri = foto;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        const storageRef = storage().ref(`fotosLocal/${quadraId}/${filename}`);

        const task = storageRef.putFile(uploadUri);

        task.on('state_changed', (taskSnapshot) => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        if ((await task).state === 'success')
         {
            var url = await storageRef.getDownloadURL();
        } 
        else 
        {
            console.log('Ocorreu um erro');
        }

        return url;
    },

    updatePhotosCourt: async (quadraid, foto1, foto2, foto3) => {
        await db.collection('quadras')
            .doc(quadraid)
            .update({
                fotosLocal: [foto1, foto2, foto3],
            });
        return true;
    },

    deleteService: async (quadraId, tipo, preco) => {
        await db.collection('quadras')
            .doc(quadraId)
            .update({
                servico: firestore.FieldValue.arrayRemove({
                    tipo: tipo,
                    preco: preco,
                }),
            });
        return true;
    },

    updatePrice: async (quadraId, tipo, preco, novoPreco) => {
        await db
            .collection('quadras')
            .doc(quadraId)
            .update({
                servico: firestore.FieldValue.arrayRemove({
                    tipo: tipo,
                    preco: preco,
                }),
            });

        await db
            .collection('quadras')
            .doc(quadraId)
            .update({
                servico: firestore.FieldValue.arrayUnion({
                    tipo: tipo,
                    preco: novoPreco,
                }),
            });
        return true;
    },

    updateAddressSC: async (quadraId, cep, rua, numero, bairro, cidade, estado) => {
        await db
            .collection('quadras')
            .doc(quadraId)
            .update({
                endereco: {
                    cep: cep,
                    rua: rua,
                    numero: numero,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                },
            });
        return true;
    },

    updatePhoneSC: async (quadraId, telefone) => {
        await db.collection('quadras').doc(quadraId).update({
            telefone: telefone,
        });
        return true;
    },

    updateAddressADM: async (donoId, cep, rua, numero, bairro, cidade, estado) => {
        await db
            .collection('dono')
            .doc(donoId)
            .update({
                endereco: {
                    cep: cep,
                    rua: rua,
                    numero: numero,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                },
            });
        return true;
    },

    updatePhoneADM: async (donoId, celular1, celular2) => {
        await db.collection('dono').doc(donoId).update({
            celular1: celular1,
            celular2: celular2,
        });
        return true;
    },

    updatePeriod: async (quadraId, selectedDay, selectedMonth, selectedYear, selectedHour) => {
        month = selectedMonth < 10 ? '0' + (selectedMonth + 1) : selectedMonth + 1;
        day = selectedDay < 10 ? '0' + selectedDay : selectedDay;
        date = `${day}/${month}/${selectedYear}`;

        var idPeriodo = '';

        await db.collection('quadras')
            .doc(quadraId)
            .collection('periodo')
            .where('data', '==', date)
            .get()
            .then((snapshot) => {
                snapshot.docs.map((doc) => {
                    idPeriodo = doc.id
                })
            });

        await db.collection('quadras')
            .doc(quadraId)
            .collection('periodo')
            .doc(idPeriodo)
            .update({
                horas: firestore.FieldValue.arrayRemove({
                    hora: selectedHour,
                    disponivel: true,
                }),
            });
        return true;
    },

    //Firebase Functions Triggers
    verifyCNPJ: async (cnpj) => {
        let result = await functions()
            .httpsCallable('verifyCNPJ')({
                cnpj: cnpj,
            })
            .catch((error) => {
                return error;
            });
        return result.data;
    },

    verifyDateBirth: async (dateNasc) => {
        let result = await functions()
            .httpsCallable('verifyDateBirth')({
                dateBirth: dateNasc,
            })
            .catch((error) => {
                return error;
            });
        return result.data;
    },

    verifyDatePeriod: async (selectedDay, selectedMonth, selectedYear) => {
        let result = await functions()
            .httpsCallable('verifyDate')({
                selectedDay: selectedDay,
                selectedMonth: selectedMonth,
                selectedYear: selectedYear,
            })
            .catch((error) => {
                return error;
            });
        return result.data;
    },

    verifyHourPeriod: async (selectedDay, selectedMonth, selectedYear, selectedHour) => {
        let result = await functions()
            .httpsCallable('verifyHourPeriod')({
                selectedDay: selectedDay,
                selectedMonth: selectedMonth,
                selectedYear: selectedYear,
                selectedHour: selectedHour,
            })
            .catch((error) => {
                return error;
            });
        return result.data;
    },
}
