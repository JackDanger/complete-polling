require 'rails_helper'

RSpec.describe "Votes", type: :request do
  let!(:poll) { Poll.create! title: "Question" }
  let!(:options) { 4.times.map { |n| poll.options.create!  text: "option #{n}" }}

  describe "GET /index" do
    subject do
      get "/votes", as: :json
    end

    context "with two votes" do
      let!(:polls) do
        2.times.map do |n|
          Poll.create!(title: "Poll ##{n}").tap do |poll|
            4.times.map { |m| poll.options.create!  text: "option #{m}" }
          end
        end
      end
      let!(:votes) { polls.map { |poll| Vote.create! poll_id: poll.id, option_id: poll.options.last.id } }

      it "retrieves the vote" do
        subject
        json = JSON.parse(response.body)
        expect(json[0]['poll_id']).to eq(polls[0].id)
        expect(json[0]['option_id']).to eq(polls[0].options.last.id)
        expect(json[1]['poll_id']).to eq(polls[1].id)
        expect(json[1]['option_id']).to eq(polls[1].options.last.id)
      end 
    end
  end

  describe "GET /show" do
    context "with a poll id" do

      subject do
        get "/polls/#{poll.id}/vote", as: :json
      end

      context "when no vote has happened" do
        it "retrieves a null vote" do
          subject
          expect(JSON.parse(response.body)).to eq({"vote" => nil})
        end 
      end

      context "when no vote has happened" do
        let!(:vote) { Vote.create! poll_id: poll.id, option_id: options.last.id }
        it "retrieves the vote" do
          subject
          json = JSON.parse(response.body)
          expect(json['vote']['poll_id']).to eq(poll.id)
          expect(json['vote']['option_id']).to eq(options.last.id)
        end 
      end
    end
  end

  describe "POST /create" do
    subject do
      post "/polls/#{poll.id}/vote", params: { option_id: options.first.id }
    end

    context "when no vote exists" do

      let!(:vote) { }

      it "votes" do
        expect {
          subject
          json = JSON.parse(response.body)
          expect(json['vote']['poll_id']).to eq(poll.id)
          expect(json['vote']['option_id']).to eq(options.first.id)
        }.to change { Vote.count }.by(1)
      end 
    end

    context "when voting has happened" do

      let!(:vote) { Vote.create! poll_id: poll.id, option_id: options.last.id }

      it "deletes the old vote" do
        expect {
          subject
          json = JSON.parse(response.body)
          expect(json['vote']['poll_id']).to eq(poll.id)
          expect(json['vote']['option_id']).to eq(options.first.id)
        }.to_not change { Vote.count }
      end
    end
  end

end
