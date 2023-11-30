const {
    user_game,
    user_game_biodata,
    user_game_history,
    game_room
  } = require("../models");

let player1_input = []
let player2_input = []
let temp_score_player1 = 0
let temp_score_player2 = 0
let round_winner = []

module.exports = {
    register: async (req, res) => {
        // kode kevin:
        // try {
        //   const usergame = await user_game.create({
        //     username: req.body.username,
        //     password: req.body.password,
        //     role: req.body.role,
        //   });
        //   const usergamebiodata = await user_game_biodata.create({
        //     id: usergame.id,
        //     uuid: usergame.uuid,
        //     username: usergame.username,
        //     nama: req.body.nama,
        //     email: req.body.email,
        //     gender: req.body.gender,
        //     date_of_birth: req.body.date_of_birth,
        //     country_of_birth: req.body.country_of_birth,
        //   });
        //   await user_game_history.create({
        //     id: usergame.id,
        //     uuid: usergame.uuid,
        //     username: usergame.username,
        //     nama: usergamebiodata.nama,
        //   });

        //   res.redirect("/dashboard");
        // } catch (err) {
        //   console.log(err);
        //   res.send("something went wrong");
        // }npm

        try {
        const {
            username,
            password,
            role,
            nama,
            email,
            gender,
            date_of_birth,
            country_of_birth,
        } = req.body;

        const superAdmin = await user_game.findOne({ where: { username: username , role: "SuperAdmin" }})

        if(!superAdmin){ 
            return res.json({ error: "Oops, hanya Admin yang boleh membuat akun" })
        }

        const newUser = await user_game.create({
            username,
            password,
            role,
        });

        const newUserBiodata = await user_game_biodata.create({
            id: newUser.id,
            uuid: newUser.uuid,
            username: newUser.username,
            nama: nama,
            email: email,
            gender: gender,
            date_of_birth: date_of_birth,
            country_of_birth: country_of_birth,
        });

        await user_game_history.create({
            id: newUser.id,
            uuid: newUser.uuid,
            username: newUser.username,
            nama: newUserBiodata.nama,
        });
    
            res.json({ message: "Register berhasil, silahkan login" });

        } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Periksa kembali data login anda" });
        }
    },

    create_room: async (req, res) => {
        generateRoomId = async () => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUV"
        const randomLetters = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)]
        const randomNumber = Math.floor(Math.random() * 90) + 10
        const temp_room_id = randomLetters + randomNumber 
        
        const roomIdExists = await game_room.findOne({ where: { room_id: temp_room_id }})
        if(roomIdExists){
            return generateRoomId()
        } else{
            return temp_room_id
        }
        }

        const temp_room_id = await generateRoomId()

        try{ 
        const { room_name } = req.body
        const { username } = req.user
        const superadmin = await user_game.findOne({ where: { role: "SuperAdmin", username: username }})

        if(superadmin){
            const roomIdExists = await game_room.findOne({ where: { room_id: temp_room_id }})
    
            if(roomIdExists){
            return res.json({ error: "room_id sudah terdaftar" })
            }
            
            await game_room.create({ room_id: temp_room_id, room_name: room_name })
            return res.json({
            room_id: temp_room_id, 
            room_name: room_name 
            })
        }else {
            return res.json({
            message: "Oops, kamu belum punya akses untuk create room"
            })
        }

        } catch(err){
        console.log(err)
        return res.json({ error: "something went wrong"})
        }
    },

    fight: async (req, res) => {
        const { username } = req.user // extract username dari jwt strategy
        const { user_input } = req.body  
        const room_id = req.params.room_id
        const playerUser = await user_game.findOne({ where: { role: "PlayerUser", username: username }})
        
        if(!playerUser){
          return res.json({ error: "Oops, kamu belum punya akses untuk bermain" })
        }
    
        // cek room_id ada di database atau tidak
        const room = await game_room.findOne({ where: { room_id: room_id }})
        if(room === null){
            return res.status(404).json({
                error: "room_id tidak terdaftar"
            }) 
        } else if(room.match_winner !== null){
            return res.json({ error: "room sudah ditutup, mohon gunakan room yang baru"})
        }
        
        //validasi user input
        if(!(user_input == "R" || user_input == "P" || user_input == "S")){
            return res.status(500).json({ error: "user input harus P/R/S "})
        }
        
        // masukin username dan input ke object
        
        try{
            if(room.dataValues.username_1 === null){           
                await game_room.update(
                { username_1: username },
                { where: { room_id: req.params.room_id }})

                player1_input.push(user_input)

                res.json({
                player_1: username,
                message: "username dan input player 1 berhasil disimpan",
                your_input: player1_input,
                rounds_remaining: 2
                })
            }
            else if(room.dataValues.username_1 === username){
                if(player1_input.length < 3){
                player1_input.push(user_input)

                res.json({
                    player_1: username, 
                    message: "input player 1 berhasil disimpan", 
                    your_input: player1_input,
                    rounds_remaining: 3 - player1_input.length
                })
                }else{
                    res.json({
                    error: "input player sudah maksimal"
                })
                }
            }
            else if(room.dataValues.username_2 === null){
                 await game_room.update(
                { username_2: username },
                { where: { room_id: req.params.room_id }})

                player2_input.push(user_input)

                res.json({
                player_2: username,
                message: "username dan input player 2 berhasil disimpan",
                your_input: player2_input,
                rounds_remaining: 2
                })
            }
            else if(room.dataValues.username_2 === username){
                if(player2_input.length < 3){
                player2_input.push(user_input)

                res.json({
                    player_2: username, 
                    message: "input player 2 berhasil disimpan", 
                    your_input: player2_input,
                    rounds_remaining: 3 - player2_input.length
                })
                }else{
                    res.json({
                    error: "input player sudah maksimal"
                })
                }
            } 
            else {
                res.json({
                error: "room sudah penuh"
                })
            }

            let match_winner = null
            const player1 = room.dataValues.username_1
            const player2 = room.dataValues.username_2
            
            // cek apakah user input player 1 dan 2 sudah penuh belum
            if(player1_input.length === 3 && player2_input.length === 3){
                // game logic
                for (let i = 0; i < 3; i++){
                if(player1_input[i] === player2_input[i]){
                    round_winner.push("DRAW") 
                }
                else if((player1_input[i] === "R" && player2_input[i] === "S") || 
                    (player1_input[i] === "P" && player2_input[i] === "R") ||
                    (player1_input[i] === "S" && player2_input[i] === "P"))
                {
                    round_winner.push(player1)
                    temp_score_player1 += 1
                }
                else if (((player1_input[i] === "S" && player2_input[i] === "R") || 
                    (player1_input[i] === "R" && player2_input[i] === "P") ||
                    (player1_input[i] === "P" && player2_input[i] === "S")))
                {
                    round_winner.push(player2)
                    temp_score_player2 += 1
                }
                } 
                console.log("round winner: ", round_winner)
                console.log("player 1 score:", temp_score_player1)
                console.log("player 2 score:", temp_score_player2)

                if(temp_score_player1 > temp_score_player2){
                match_winner = player1
                } else if(temp_score_player1 < temp_score_player2){
                match_winner = player2
                } else {
                match_winner = "DRAW"
                }

                
                // mapping data
                game_room.update(
                { player1_score: temp_score_player1,
                    player2_score: temp_score_player2,
                    match_winner: match_winner,
                    round_winner: round_winner },
                { where: { room_id: req.params.room_id }})
                .catch((err) => {console.log(err)})
                
                const user1_history = await user_game_history.findOne({ where: { username: player1 }}) 
                const user2_history = await user_game_history.findOne({ where: { username: player2 }})
                
                // ambil array room id yang sudah ada di db, lalu tambahin room id yang baru 
                const updatedRoomId1 = [...user1_history.room_id, room_id]
                const updatedRoomId2 = [...user2_history.room_id, room_id];
                console.log("updatedRoomId1:", updatedRoomId1)
                console.log("updatedRoomId2:" ,updatedRoomId2)

                const currentTime = new Date()
                // const formattedTime = currentTime.toLocaleString()

                if(match_winner === player1){
                await user_game_history.update({
                    last_saved_on: currentTime,
                    score: user1_history.dataValues.score + temp_score_player1,
                    wins: user1_history.dataValues.wins + 1 ,
                    room_id: updatedRoomId1
                }, {
                    where: { username: player1 }
                })

                await user_game_history.update({
                    last_saved_on: currentTime,    
                    score: user2_history.dataValues.score + temp_score_player1,
                    room_id: updatedRoomId2
                },
                {
                    where: { username: player2 }
                })
                
                }else if(match_winner === player2){
                await user_game_history.update({
                    last_saved_on: currentTime,
                    score: user2_history.dataValues.score + temp_score_player1,
                    wins: user2_history.dataValues.wins + 1 ,
                    room_id: updatedRoomId2
                }, 
                {
                    where: { username: player2 }
                })

                await user_game_history.update({
                    last_saved_on: currentTime,    
                    score: user1_history.dataValues.score + temp_score_player1,
                    room_id: updatedRoomId1
                },
                {
                    where: { username: player1 }
                })
                
                }

                // reset
                round_winner = []
                player1_input = []
                player2_input = []
                temp_score_player1 = 0
                temp_score_player2 = 0
            }
            
        }catch (err){ 
        console.log(err)
        return res.json({ error: "something went wrong"})
        }    
    },
    
    fight_result: async (req, res) => {
        const room_id = req.params.room_id
        const room = await game_room.findOne({ where: { room_id: room_id } })

        const { username_1, username_2, player1_score, player2_score, round_winner, match_winner } = room

        return res.json({
            player_1: username_1,
            player_2: username_2,
            player1_score: player1_score,
            player2_score: player2_score, 
            round_winner: round_winner,
            match_winner: match_winner
        })

    }
}
