import axios from "axios";

const apiToken = "ATTA7d22a927ae91183929edb7452cc30b120fb5530f242233cfdc38b05526e377a188935601";
const apiKey = "c8e44c4db69c3342b2b80e9f65ff0ec4";

export const getAllBoards = async () => {
  let boardsResponse = await axios.get(`https://api.trello.com/1/members/me/boards?fields=name,url&key=${apiKey}&token=${apiToken}`);
  return boardsResponse.data;
};

export async function getBoard(boardId) {
  const boardResponse = await axios.get(`https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`);
  return boardResponse.data;
}

export const createBoards = async (boardName) => {
  let newBoard = await axios.post(`https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${apiToken}`);
  return newBoard.data;
};

export const getListOfBoard = async(boardId) =>{
    let lists = await axios.get(`https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`);
    return lists.data;
}

export const getCardsOfList = async(listId) =>{
    let cards = await axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`);
    return cards.data;
}

export const createNewList = async (listName, boardId) => {
    let createdList = await axios.post(`https://api.trello.com/1/lists?name=${listName}&idBoard=${boardId}&key=${apiKey}&token=${apiToken}`);
    return createdList.data;
  };

  export const deleteList = async (listID) => {
    let deletedList = await axios.put(`https://api.trello.com/1/lists/${listID}/closed?value=true&key=${apiKey}&token=${apiToken}`);
    return deletedList.data;
}

export const createNewCard = async (cardName, listID) => {
    let createdCard = await axios.post(`https://api.trello.com/1/cards?idList=${listID}&name=${cardName}&key=${apiKey}&token=${apiToken}`);
    console.log('fine');
    return createdCard.data; 
}

export const deleteCardApi = async(cardID) =>{
    let deletedCard = await axios.delete(`https://api.trello.com/1/cards/${cardID}?key=${apiKey}&token=${apiToken}`);
    return deletedCard.data;
}

export const getCheckLists = async(listId) =>{
  let lists = await axios.get(`https://api.trello.com/1/cards/${listId}/checklists?key=${apiKey}&token=${apiToken}`);
  return lists.data;
}

export const createCheckList = async(checkListName ,cardId) =>{
  let createdChecklist = await axios.post(`https://api.trello.com/1/checklists?idCard=${cardId}&name=${checkListName}&key=${apiKey}&token=${apiToken}`)
    return createdChecklist.data;
}

export const deleteChecklist = async (checklistId) => {
  let deletedChecklist = await axios.delete(`https://api.trello.com/1/checklists/${checklistId}?key=${apiKey}&token=${apiToken}`)
  return deletedChecklist.data;
}

export const getCheckItems = async (checkListId) =>{
  let checkItems = await axios.get(`https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${apiToken}`);
    return checkItems.data;
}

export const createCheckitem = async (name, checklistId) => {
  let createdChecklist = await axios.post(`https://api.trello.com/1/checklists/${checklistId}/checkItems?name=${name}&key=${apiKey}&token=${apiToken}`)
  return createdChecklist.data;
}

export const deleteCheckitem = async (checkitemId, checklistId) => {
  let deletedCheckitem = await axios.delete(`https://api.trello.com/1/checklists/${checklistId}/checkItems/${checkitemId}?key=${apiKey}&token=${apiToken}`)
  return deletedCheckitem.data;
}

export const updateCheckitem = async (cardId, checkitemId, state) => {
  let stateQuery = "state=" + state;
  let updatedCheckitem = await axios.put(`https://api.trello.com/1/cards/${cardId}/checkItem/${checkitemId}?${stateQuery}&key=${apiKey}&token=${apiToken}`)
  return updatedCheckitem.data;
}