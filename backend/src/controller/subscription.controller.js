import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";
import { mongoose } from "mongoose";

//creating a subscriber
export const createASubscriber = asyncHandler(async (req, res) => {
  const subscriber = await User.findById(req.user._id);
  if (!subscriber) {
    throw new ApiError(400, "Subscriber not found");
  }
//channel details, i am sending objectid instead of params
  const { channel } = req.params; 
  console.log("channel", channel)
  if (!channel) {
    throw new ApiError(400, "Channel name is missing");
  }

  
//watch it
  // if(Subscription.findById(channel)){
  //   throw new ApiError(400, "Channel already subscribed");
  // }
  // console.log(subscriber, channel)
  const createdSubscriber = await Subscription.create({
    subscriber: req.user._id,
    channel,
  });

  if (!createdSubscriber) {
    throw new ApiError(500, "Something went wrong while adding the subscriber");
  }
  console.log(createdSubscriber);
  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Subscribed successfully"));
});

//UNSUBSCRIBER
export const deleteASubscriber = asyncHandler(async( req , res)=>{

  const  user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(400, "user not found");
  }
  
// console.log('logged user', user)
  const { channel } = req.params;
  // const channelId = mongoose.Types.ObjectId(channel);
// console.log(channel, channelId)
  if (!channel) {
    throw new ApiError(400, "Channel details is missing");
  }
  
const deletedChannel = await Subscription.findOneAndDelete({subscriber : user._id , channel : channel})


if (!deletedChannel) {
  throw new ApiError(500, "Something went wrong while deleteing the subscriber");
}
// console.log(deletedChannel);
return res
.status(201)
.json(new ApiResponse(200, {}, "Unsubscribed successfully"));
} )